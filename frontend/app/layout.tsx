import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Authenticated } from "./components/ui/authenticated";
import { ElvenInit } from "./components/ui/elven-init";

const inter = Inter({ subsets: ["latin"] });

const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;
const globalTitle = "xChat";
const globalDescription = "MultiversX Docs Chatbot";
const globalImage = `${dappHostname}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(dappHostname!),
  title: globalTitle,
  description: globalDescription,
  authors: { name: "Carlo Stanciu", url: "https://ezalabs.io" },
  openGraph: {
    title: globalTitle,
    images: [globalImage],
    description: globalDescription,
    type: "website",
    url: dappHostname,
  },
  twitter: {
    title: globalTitle,
    description: globalDescription,
    images: [globalImage],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full`}
        style={{ background: "#262629" }}
      >
        <ElvenInit />
        <div className={`flex flex-col md:p-8`}>
          <Authenticated>{children}</Authenticated>
        </div>
      </body>
    </html>
  );
}
