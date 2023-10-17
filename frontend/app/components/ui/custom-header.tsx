"use client";

import * as React from "react";
import Link from "next/link";
import { TokenTransfer } from "@multiversx/sdk-core";
import { LoginModalButton } from "./login-modal-button";
import { useAccount, useConfig, useLogin, useLoginInfo } from "@useelven/core";
import { Button, IconButton } from "./button";
import { isMobile } from "@/app/utils/isMobile";
import { shortenHash } from "@/app/utils/shortenHash";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import Logo from "./logo";
import {
  marginHorizMobile,
  marginHorizWeb,
  marginTopNavbarMobile,
  marginTopNavbarWeb,
  headerHeightMobile,
  headerHeightWeb,
} from "@/app/utils/constants";

export const CustomHeader = () => {
  const { address, nonce, balance, activeGuardianAddress } = useAccount();
  const { explorerAddress } = useConfig();
  let { isLoggedIn } = useLogin();
  const { loginMethod, expires, loginToken, signature } = useLoginInfo();

  const showNonce = false;

  isLoggedIn = true;

  const marginX = isMobile() ? marginHorizMobile : marginHorizWeb;
  const marginTopNavbar = isMobile()
    ? marginTopNavbarMobile
    : marginTopNavbarWeb;

  const height = isMobile() ? headerHeightMobile : headerHeightWeb;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onCloseComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  function renderAccountButton() {
    return (
      <>
        {isMobile() ? (
          <IconButton type="account" onClick={handleOpen} />
        ) : (
          <Button onClick={handleOpen} text={shortenHash(address, 6)} />
        )}
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
    <div
      style={{
        position: "sticky",
        backgroundColor: "#262629",
        zIndex: 1,
        boxShadow: "0px 0px 15px #20f6d8",
        top: 0,
        paddingBottom: 2,
        height: height,
      }}
    >
      <div
        style={{
          marginLeft: marginX,
          marginRight: marginX,
          marginTop: marginTopNavbar,
        }}
        className={`flex items-center w-auto flex-${
          isLoggedIn ? "row" : "col"
        } justify-between`}
      >
        <div>
          <Logo />
        </div>
        {isLoggedIn && (
          <div className="flex flex-row space-x-5">
            {renderAccountButton()}
            <LoginModalButton />
          </div>
        )}
      </div>
    </div>
  );
};
