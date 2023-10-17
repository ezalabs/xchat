import { useCallback, memo, useState } from "react";
import { useLogin, LoginMethodsEnum } from "@useelven/core";
import { WalletConnectQRCode } from "./walletconnect-qr-code";
import { WalletConnectPairings } from "./walletconnect-pairings";
import { Spinner } from "./spinner";
import { getLoginMethodDeviceName } from "@/app/utils/getSigningDeviceName";

import { Button } from "./button";

export const LoginComponent = memo(() => {
  const {
    login,
    isLoggingIn,
    error,
    walletConnectUri,
    walletConnectPairingLogin,
    walletConnectPairings,
    walletConnectRemovePairing,
  } = useLogin();

  const [loginMethod, setLoginMethod] = useState<LoginMethodsEnum>();

  const handleLogin = useCallback(
    (type: LoginMethodsEnum, ledgerAccountsIndex?: number) => () => {
      setLoginMethod(type);
      login(type, ledgerAccountsIndex);
    },
    [login],
  );

  const ledgerOrPortalName = getLoginMethodDeviceName(loginMethod!);

  if (error)
    return (
      <div className="flex flex-col">
        <div className="text-center">{error}</div>
        <div className="text-center pt-4 font-bold">Close and try again</div>
      </div>
    );

  return (
    <>
      {isLoggingIn ? (
        <div className="flex inset-0 z-50 items-center justify-center min-h-[208px]">
          <div>
            {ledgerOrPortalName ? (
              <>
                <div className="text-lg">Confirmation required</div>
                <div className="text-sm">Approve on {ledgerOrPortalName}</div>
              </>
            ) : null}
            <div className="flex items-center justify-center mt-6">
              <Spinner size="40" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center px-8">
          <Button
            text={
              loginMethod === LoginMethodsEnum.walletconnect && walletConnectUri
                ? "Reset QR code"
                : "xPortal Mobile App"
            }
            onClick={handleLogin(LoginMethodsEnum.walletconnect)}
          />
        </div>
      )}

      {loginMethod === LoginMethodsEnum.walletconnect && walletConnectUri && (
        <div className="mt-5">
          <WalletConnectQRCode uri={walletConnectUri} />
        </div>
      )}
      {loginMethod === LoginMethodsEnum.walletconnect &&
        walletConnectPairings &&
        walletConnectPairings.length > 0 && (
          <WalletConnectPairings
            pairings={walletConnectPairings}
            login={walletConnectPairingLogin}
            remove={walletConnectRemovePairing}
          />
        )}
    </>
  );
});

LoginComponent.displayName = "LoginComponent";
