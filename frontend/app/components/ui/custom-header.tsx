"use client";

import * as React from "react";
import Link from "next/link";
import { TokenTransfer } from "@multiversx/sdk-core";
import { LoginModalButton } from "./login-modal-button";
import { useAccount, useConfig, useLogin, useLoginInfo } from "@useelven/core";
import CustomButton from "./button";
import { isMobile } from "@/app/utils/isMobile";
import { shortenHash } from "@/app/utils/shortenHash";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

export const CustomHeader = () => {
  const marginX = isMobile() ? 2 : 25;

  const network = process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN;

  const { address, nonce, balance, activeGuardianAddress } = useAccount();
  const { explorerAddress } = useConfig();
  const { isLoggedIn } = useLogin();
  const { loginMethod, expires, loginToken, signature } = useLoginInfo();

  const showNonce = false;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onCloseComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  function renderAddressButton() {
    return (
      <>
        <CustomButton
          onClick={handleOpen}
          outline={true}
          text={shortenHash(address, 6)}
        />
        <Dialog open={isOpen} onOpenChange={onCloseComplete}>
          <DialogContent
            className="max-w-xs sm:max-w-lg text-white p-0"
            style={{
              background: "#262629",
              borderColor: "#36363b",
              paddingBottom: 15,
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="mb-5">User data</DialogTitle>
              <div>
                <span className="inline-block font-bold">address:</span>{" "}
                <Link
                  className="underline"
                  href={`${explorerAddress}/accounts/${address}`}
                >
                  {shortenHash(address, 8)}
                </Link>
              </div>
              {activeGuardianAddress && (
                <div>
                  <span className="inline-block font-bold">guardian: </span>
                  <Link
                    className="underline"
                    href={`${explorerAddress}/accounts/${address}`}
                  >
                    {shortenHash(activeGuardianAddress, 8)}
                  </Link>
                  <span>-</span>
                </div>
              )}
              {showNonce && (
                <div>
                  <span className="inline-block font-bold">nonce:</span> {nonce}
                </div>
              )}
              <div>
                <span className="inline-block font-bold">balance:</span>{" "}
                {balance
                  ? parseFloat(
                      TokenTransfer.egldFromBigInteger(
                        balance,
                      ).toPrettyString(),
                    )
                  : "-"}
              </div>
              <div>
                <span className="inline-block font-bold">loginMethod:</span>{" "}
                {loginMethod} - xPortal
              </div>
              <div>
                <span className="inline-block font-bold">expires:</span>{" "}
                {new Date(expires * 1000).toUTCString()}
              </div>
              <div>
                <span className="inline-block font-bold">loginToken:</span>
                <div className="break-all text-left">{loginToken || "-"}</div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className={`flex items-center w-auto mx-${marginX} mt-2 flex-col`}>
      <div className="flex flex-1 flex-row w-auto mb-5">
        <div>
          <p
            className="cursor-pointer text-4xl font-black text-center"
            style={{ color: "#20f6d8" }}
          >
            x<span style={{ color: "white" }}>Chat</span>
          </p>
          <p style={{ color: "white", textAlign: "center", fontSize: 15 }}>
            <span style={{ color: "#AAFF00" }}>● </span>
            {network}
          </p>
        </div>
      </div>
      {isLoggedIn && (
        <div className="flex flex-row space-x-5">
          {renderAddressButton()}
          <LoginModalButton />
        </div>
      )}
    </div>
  );
};
