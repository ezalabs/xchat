import { Button as B, IconButton as IB, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { MdLogout, MdAccountBox } from "react-icons/md";

export function LinkButton(props: { href: string; text: string }) {
  const { href, text } = props;

  return (
    <Link
      href={href}
      passHref
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      <B as="a" background={"#20f6d8"} color={"#131313"}>
        {text}
      </B>
    </Link>
  );
}

export function IconButton(props: {
  type: "logout" | "account";
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  let type;

  switch (props.type) {
    case "logout":
      type = MdLogout;
      break;
    case "account":
      type = MdAccountBox;
      break;
  }

  return (
    <IB
      aria-label={props.type}
      onClick={props.onClick}
      background={"#20f6d8"}
      color={"#131313"}
      _hover={{ bg: "rgba(35, 246, 218, 0.23)" }}
      icon={<Icon w={5} h={5} as={type} />}
    >
      {props.text}
    </IB>
  );
}

export function Button(props: {
  text: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const { text, isLoading, onClick } = props;

  return (
    <B
      isLoading={isLoading}
      onClick={onClick}
      background={"#20f6d8"}
      color={"#131313"}
      _hover={{ bg: "rgba(35, 246, 218, 0.23)" }}
    >
      {text}
    </B>
  );
}
