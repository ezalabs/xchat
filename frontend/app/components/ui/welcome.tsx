import { LoginModalButton } from "./login-modal-button";

export const WelcomeForm = () => {
  return (
    <div className="text-center justify-content-center my-10 flex flex-col space-y-20 w-responsive mx-auto p-2">
      <div className="flex flex-col space-y-10 text-white">
        <p style={{ fontWeight: 'bold' }}>Demystify MultiversX technology with our AI-powered chatbot.</p>
        <p style={{ marginBottom: 5 }}>Log in to begin your journey of discovery.</p>
        <LoginModalButton />
      </div>
    </div>
  );
};
