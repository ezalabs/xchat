import { useState } from "react";
import { LoginModalButton } from "./login-modal-button";
import Logo from "./logo";
import Typed from "react-typed";

export const WelcomeForm = () => {
  const [textLoaded, setTextLoaded] = useState(false);

  return (
    <>
      <div className={`flex items-center w-auto my-10 ml-10 justify-center`}>
        <Logo />
      </div>
      <div className="text-center justify-content-center mb-10 flex flex-col space-y-20 w-responsive mx-auto p-2">
        <div className="flex flex-col space-y-10 text-white">
          <Typed
            showCursor={false}
            strings={[
              "Demystify MultiversX technology with our AI-powered chatbot.",
            ]}
            style={{ fontWeight: "bold" }}
            typeSpeed={50}
          />
          <Typed
            style={{ marginBottom: 5 }}
            showCursor={false}
            strings={["Log in to begin your journey of discovery."]}
            startDelay={5000}
            onComplete={() => setTextLoaded(true)}
            typeSpeed={50}
          />
          <div>{textLoaded && <LoginModalButton />}</div>
        </div>
      </div>
    </>
  );
};
