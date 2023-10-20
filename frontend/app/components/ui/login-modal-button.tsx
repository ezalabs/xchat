"use client";

import { FC, useState } from "react";
import { useLogin, useLogout } from "@useelven/core";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { useEffectOnlyOnUpdate } from "@/app/hooks/use-effect-only-on-update";
import { LoginComponent } from "./login-component";
import { Button, IconButton } from "./button";
import Typed from "react-typed";

interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export const LoginModalButton: FC<LoginModalButtonProps> = ({
  onClose,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, isLoggingIn, setLoggingInState } = useLogin();

  const { logout } = useLogout();

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      setIsOpen(false);
      onClose?.();
    }
  }, [isLoggedIn]);

  const onCloseComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setTimeout(() => {
        setLoggingInState("error", "");
      }, 1000);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseComplete}>
      {isLoggedIn ? (
        <IconButton onClick={() => logout()} type="logout" />
      ) : (
        <Button
          text={isLoggingIn ? "Connecting..." : "Connect"}
          onClick={handleOpen}
        />
      )}
      <DialogContent
        className="max-w-xs sm:max-w-lg text-white p-0"
        style={{ background: "#262629", borderColor: "#36363b" }}
      >
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            <Typed
              showCursor={true}
              cursorChar="."
              strings={["Connect your wallet"]}
              typeSpeed={40}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 overflow-y-auto max-h-[calc(100vh-160px)] p-6 pb-8">
          <LoginComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
