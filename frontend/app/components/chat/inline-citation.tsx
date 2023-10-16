import { Source } from "./source-bubble";

export function InlineCitation(props: {
  source: Source;
  sourceNumber: number;
  highlighted: boolean;
  onMouseEnter: () => any;
  onMouseLeave: () => any;
}) {
  const { source, sourceNumber, highlighted, onMouseEnter, onMouseLeave } =
    props;
  return (
    <a
      href={source.url}
      target="_blank"
      className={`relative ml-1 text-xs border rounded px-1 ${
        highlighted ? "bg-[rgb(58,58,61)]" : "bg-[rgb(78,78,81)]"
      }`}
      style={{ borderColor: "rgba(35, 246, 218, 0.23)" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {sourceNumber}
    </a>
  );
}
