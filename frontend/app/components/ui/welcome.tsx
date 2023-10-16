import { LoginModalButton } from "./login-modal-button";

export const WelcomeForm = () => {
  return (
    <div className="text-center justify-content-center my-10 flex flex-col space-y-20 w-responsive mx-auto p-2 bg-red">
      <div className="flex flex-col space-y-10">
        <p className="text-white">Welcome to your friendly neighborgood MultiversX Chatbot!</p>
        <LoginModalButton />
      </div>
    </div>
  );
};
