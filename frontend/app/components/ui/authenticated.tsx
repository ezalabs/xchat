"use client";
import { FC, PropsWithChildren } from "react";
import { useLoggingIn } from "@useelven/core";
import { Spinner } from "./spinner";
import { WelcomeForm } from "./welcome";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./footer";
import { CustomHeader } from "./custom-header";

interface AuthenticatedProps {
  noSpinner?: boolean;
  spinnerCentered?: boolean;
}

export const Authenticated: FC<PropsWithChildren<AuthenticatedProps>> = ({
  children,
  noSpinner = false,
  ...props
}) => {
  const { pending, loggedIn } = useLoggingIn();

  if (pending)
    return noSpinner ? null : (
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        {...props}
      >
        <Spinner />
      </div>
    );

  return (
    <ChakraProvider>
      <CustomHeader />
      {loggedIn ? children : <WelcomeForm />}
      <Footer />
    </ChakraProvider>
  );
};
