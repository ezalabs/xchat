import { LoginMethodsEnum } from "@useelven/core";

export const getLoginMethodDeviceName = (type: LoginMethodsEnum) => {
  if (type === LoginMethodsEnum.ledger) return "Ledger hardware wallet";
  if (type === LoginMethodsEnum.walletconnect) return "xPortal app";
  return "";
};
