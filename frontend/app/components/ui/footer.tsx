import packageJson from "@/package.json";

export default function Footer() {
  return (
    <div className=" items-center mt-5 text-white mb-5 relative">
      <div className="flex flex-col items-center justify-center container mx-auto text-center text-sm">
        <div className="font-bold">xChat v{`${packageJson.version}`}</div>
        <div className="text-xs font-light mt-2">
          Currently in alpha development for xDay Hackathon.
        </div>
        <div className="flex flex-row content-center text-xs font-bold mt-4">
          <a color="white" href="https://ezalabs.io" target="_blank">
            {"ezalabs.io"}
          </a>
          <span className="font-thin mx-2"> | </span>
          <a href="https://multiversx.com/" target="_blank">
            {"MultiversX"}
          </a>
        </div>
      </div>
    </div>
  );
}
