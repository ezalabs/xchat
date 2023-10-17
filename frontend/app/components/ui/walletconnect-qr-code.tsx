import { useEffect, useState, FunctionComponent } from "react";
import { useConfig } from "@useelven/core";
import QRCode from "qrcode";
import { isMobile } from "@/app/utils/isMobile";
import { LinkButton } from "./button";

interface WalletConnectQRCodeProps {
  uri: string;
}

export const WalletConnectQRCode: FunctionComponent<
  WalletConnectQRCodeProps
> = ({ uri }) => {
  const [qrCodeSvg, setQrCodeSvg] = useState("");
  const { walletConnectDeepLink } = useConfig();

  useEffect(() => {
    const generateQRCode = async () => {
      if (!uri) {
        setQrCodeSvg("<div>dupa</div>");
        return;
      }

      const svg = await QRCode.toString(uri, {
        type: "svg",
      });

      setQrCodeSvg(svg);
    };
    generateQRCode();
  }, [uri]);

  const mobile = isMobile();

  return (
    <div>
      {mobile ? (
        <div className="flex justify-center w-full mb-6">
          <LinkButton
            text={"Go to xPortal to sign in!"}
            href={`${walletConnectDeepLink}?wallet-connect=${encodeURIComponent(
              uri,
            )}`}
          />
        </div>
      ) : null}
      <div
        className="[&>svg]:rounded-xl [&>svg]:max-w-xs [&>svg]:mx-auto [&>svg]:border [&>svg]:border-solid [&>svg]:border-zinc-300 dark:[&>svg]:border-0"
        dangerouslySetInnerHTML={{
          __html: qrCodeSvg,
        }}
      />
    </div>
  );
};
