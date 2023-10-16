from dotenv import load_dotenv

import logging
import os
import re
from html_parser import html_docs_extractor

from bs4 import BeautifulSoup, SoupStrainer
from langchain.document_loaders import RecursiveUrlLoader, SitemapLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.utils.html import PREFIXES_TO_IGNORE_REGEX, SUFFIXES_TO_IGNORE_REGEX

from langchain.vectorstores import SupabaseVectorStore
from supabase.client import create_client

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
VECTOR_STORE_TABLE_NAME = os.getenv("VECTOR_STORE_TABLE_NAME")
VECTOR_STORE_QUERY_NAME = os.getenv("VECTOR_STORE_QUERY_NAME")
WEB_DOCS_MAIN_PATH = os.getenv("WEB_DOCS_MAIN_PATH")
WEB_API_MAIN_PATH = os.getenv("WEB_API_MAIN_PATH")
WHITEPAPER_PATH = os.getenv("WHITEPAPER_PATH")


def metadata_extractor(meta: dict, soup: BeautifulSoup) -> dict:
    title = soup.find("title")
    description = soup.find("meta", attrs={"name": "description"})
    html = soup.find("html")
    return {
        "source": meta["loc"],
        "title": title.get_text() if title else "",
        "description": description.get("content", "") if description else "",
        "language": html.get("lang", "") if html else "",
        **meta,
    }


def load_multiversx_docs():
    return SitemapLoader(
        WEB_DOCS_MAIN_PATH + "sitemap.xml",
        filter_urls=[WEB_DOCS_MAIN_PATH],
        parsing_function=html_docs_extractor,
        default_parser="lxml",
        bs_kwargs={
            "parse_only": SoupStrainer(
                name=("article", "title", "html", "lang", "content")
            ),
        },
        meta_function=metadata_extractor,
    ).load()


def simple_extractor(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    return re.sub(r"\n\n+", "\n\n", soup.text).strip()


def load_api_docs():
    return RecursiveUrlLoader(
        url=WEB_API_MAIN_PATH,
        max_depth=8,
        extractor=simple_extractor,
        prevent_outside=True,
        use_async=True,
        timeout=600,
        link_regex=(
            f"href=[\"']{PREFIXES_TO_IGNORE_REGEX}((?:{SUFFIXES_TO_IGNORE_REGEX}.)*?)"
            r"(?:[\#'\"]|\/[\#'\"])"
        ),
        check_response_status=True,
        exclude_dirs=(),
    ).load()


def ingest_docs():
    docs_from_documentation = load_multiversx_docs()
    logger.info(f"Loaded {len(docs_from_documentation)} docs from documentation")
    docs_from_api = load_api_docs()
    logger.info(f"Loaded {len(docs_from_api)} docs from API")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
    docs_transformed = text_splitter.split_documents(
        docs_from_documentation + docs_from_api
    )

    for doc in docs_transformed:
        if "source" not in doc.metadata:
            doc.metadata["source"] = ""
        if "title" not in doc.metadata:
            doc.metadata["title"] = ""

    client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    embedding = OpenAIEmbeddings(
        openai_api_key=OPENAI_API_KEY,
        chunk_size=200,
    )  # rate limit

    vectorstore = SupabaseVectorStore(
        client=client,
        embedding=embedding,
        table_name=VECTOR_STORE_TABLE_NAME,
        query_name=VECTOR_STORE_QUERY_NAME,
    )

    numOfIngestedDocs = 0

    for docs in split_list(docs_transformed):
        numOfIngestedDocs += len(vectorstore.add_documents(docs))

    logger.info("Number of ingested vectors: " + str(numOfIngestedDocs))


def split_list(a_list):
    half = len(a_list) // 2
    return a_list[:half], a_list[half:]


if __name__ == "__main__":
    ingest_docs()
