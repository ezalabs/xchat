import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { MouseEventHandler } from "react";

export default function CustomButton(props: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  outline?: boolean;
}) {
  const { text, onClick, href, outline } = props;

  return href ? (
    <Link
      href={href}
      passHref
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      <Button as="a" background={"#20f6d8"} color={"#131313"}>
        {text}
      </Button>
    </Link>
  ) : outline ? (
    <Button
      onClick={onClick}
      background={""}
      outlineColor={"rgba(35, 246, 218, 0.23)"}
      color={"white"}
      _hover={{ bg: "rgba(35, 246, 218, 0.23)" }}
    >
      {text}
    </Button>
  ) : (
    <Button
      onClick={onClick}
      background={"#20f6d8"}
      color={"#131313"}
      _hover={{ bg: "rgba(35, 246, 218, 0.23)" }}
    >
      {text}
    </Button>
  );
}
