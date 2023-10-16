import { FC, MouseEventHandler } from "react";
import { PairingTypesStruct } from "@useelven/core";
import { X } from "lucide-react";
import { IconButton } from "@chakra-ui/react";

interface WalletConnectPairingsProps {
  pairings: PairingTypesStruct[];
  login: (topic: string) => Promise<void>;
  remove: (topic: string) => Promise<void>;
}

export const WalletConnectPairings: FC<WalletConnectPairingsProps> = ({
  pairings,
  login,
  remove,
}) => {
  const handleLogin = (topic: string) => () => {
    login(topic);
  };

  const handleRemove =
    (topic: string): MouseEventHandler<HTMLButtonElement> | undefined =>
    (e) => {
      e.stopPropagation();
      remove(topic);
    };

  return (
    <div className="flex flex-row justify-center">
      <div className="w-4/5">
        {pairings?.length > 0 && (
          <div className="text-base mt-4">Existing pairings:</div>
        )}
        {pairings.map((pairing) => (
          <div
            className="my-3 py-2 px-4 pr-8 rounded-md cursor-pointer flex flex-row"
            key={pairing.topic}
            onClick={handleLogin(pairing.topic)}
          >
            <IconButton
              size="xs"
              className="mr-5"
              onClick={handleRemove(pairing.topic)}
              aria-label={""}
            >
              <X size="15" />
            </IconButton>
            <div className="text-lg">{pairing.peerMetadata?.name}</div>
            {pairing.peerMetadata?.url ? (
              <div className="text-xs">({pairing.peerMetadata.url})</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
