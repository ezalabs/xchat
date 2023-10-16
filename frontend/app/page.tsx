"use client";

import { ChatWindow } from "./components/chat/chat-window";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <ChatWindow />
    </>
  );
}
