"use client";
import { useLoggingIn } from "@useelven/core";
import { ChakraProvider } from "@chakra-ui/react";
import { ChatWindow } from "./components/chat/chat-window";
import { ToastContainer } from "react-toastify";
import { CustomHeader } from "./components/ui/custom-header";
import Footer from "./components/ui/footer";
import { WelcomeForm } from "./components/ui/welcome";
import { Spinner } from "./components/ui/spinner";

export default function Home() {
  const { pending, loggedIn } = useLoggingIn();

  if (pending)
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ChakraProvider>
          <Spinner />
        </ChakraProvider>
      </div>
    );

  return (
    <>
      {loggedIn ? (
        <>
          <ChakraProvider>
            <CustomHeader />
            <ToastContainer />
            <ChatWindow />
          </ChakraProvider>
        </>
      ) : (
        <ChakraProvider>
          <WelcomeForm />
          <Footer />
        </ChakraProvider>
      )}
    </>
  );
}
