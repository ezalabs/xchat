# xChat - MultiversX Docs AI Chatbot

![Alt text](readme-cover.png)


**xChat** is a **NLP** (Natural Language Processing) & **context aware** web chatbot, specifically engineered for handling MultiversX's repository of **knowledge and documentation** leveraging the power of **LLMs**. Designed to interact with users of all technical proficiencies, it utilizes the extensive online MX Docs to provide assistance. Moreover, xChat serves as an ideal starting point for new developers joining the **MultiversX Dev Ecosystem** using **xPortal** access system.

The application levereges **RAG** (Retriever-Augumented-Generation) to deliver accurate and contextually relevant responses using **AI** and also takes advantage of  **LangChain**'s streaming support and async API to update the page in real time for multiple users.

The next step for the app is to provide an **AI Agent** capability, that aside docs it has also access and **can interact with different tools** from the **MultiversX Dev ecoystem**, **creating intuitive experience** for present and future builders. 


***❗xChat is in Proof of Concept state ❗***

** ⏯️ Short DEMO video of the app here: [YouTube](https://www.youtube.com/watch?v=R0eVW55Y7Ow) **


##  Running locally

### Backend
* `cd backend/`
*  Install backend dependencies: `poetry install`.
*  Make sure to configure your environment variables (rename `.env.template to .env`):

```
OPENAI_API_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_URL=
VECTOR_STORE_TABLE_NAME=
VECTOR_STORE_QUERY_NAME=

```
* Run the` db_script.sql` in your Supabase dashboard. It will:
   - create vector extension
   - create table for doc embeddings 
   - create search function for vectors
*  Run `python ingest.py` to ingest MX docs data into the Supabase vectorstore (only needs to be done once).
*  Start the Python backend with `poetry run make start`.

### Frontend

*  Install frontend dependencies by running `cd frontend/`, then `yarn`.
*  Make sure to configure your environment variables (rename `.env.template to .env.local`):

```
NEXT_PUBLIC_MULTIVERSX_CHAIN = 
NEXT_PUBLIC_WC_PROJECT_ID = 
NEXT_PUBLIC_DAPP_HOST =
NEXT_PUBLIC_API_BASE_URL =
```

*  Run the frontend with `yarn dev` for frontend.
*  Open [localhost:3000](http://localhost:3000) in your browser.



##  Technical description

The system comprises 3 principal elements: **Data Ingestion**, **Chat API** and **Client App**.

##### Ingestion (Python). Steps:

* Pull all html pages from documentation site as well as the API page
* Pull MultiversX Whitepaper (not yet implemented)
* Load, parse and split documents using Langchain tools
* Create Embeddings (with OpenAI) from the documents and persist them to the Vector Store (Supabase)

##### Chat API endpoint (Python). Steps:

*  POST `/chat` :
   - payload:` { message, history (optional), conversation_id (optional) }`
   - response: Streaming Data `text/event-stream`

* Using the `GPT-3.5-turbo-16k model` by default, generate a standalone question based on the `chat_history` and `message` inputs from the payload.
*  Given that standalone question, search for relevant documents from the vectorstore alongside with their sources.
*  Pass the standalone question and relevant documents to the model to generate and stream the final answer.


##### Client App (NextJS). Steps:
* User logs in via xPortal
* Can access address & login session data
* Can log out the app
* Can select example question or provide own question in the input
* Users sends the questions and is provided with the (streaming) answer together with the sources (URLs)

##  Next steps

* Improve UI / UX
* Improve LLM request templating to deliver more accurate responses
* Resolve current React reload issues
* Create new function to ingest MultiversX Whitepaper (DONE)
* Plan to develop the AI Agent feature


------------



#### References

[MultiversX Docs](https://docs.multiversx.com/)

[OpenAI](https://openai.com/blog/openai-api)

[Next.js](https://nextjs.org)

[useElven](https://www.useelven.com/)

[FastAPI](https://fastapi.tiangolo.com/)

[LangChain](https://github.com/hwchase17/langchain/)

[ChatLangchain](https://github.com/langchain-ai/chat-langchain/)

[supabase](https://supabase.com/)

