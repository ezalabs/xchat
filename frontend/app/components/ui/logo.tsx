export default function Logo() {
  const network = process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN;

  return (
    <div className="flex flex-row">
      <p
        className="cursor-pointer text-4xl font-black text-center"
        style={{ color: "#20f6d8" }}
      >
        x<span style={{ color: "white" }}>Chat</span>
      </p>
      <p
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 12,
          position: "relative",
        }}
      >
        <span style={{ color: "#AAFF00", marginLeft: 3 }}>● </span>
        {network}
      </p>
    </div>
  );
}
