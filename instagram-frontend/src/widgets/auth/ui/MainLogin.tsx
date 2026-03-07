import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { IgLabel } from "./Iglabel";
import { Divider } from "./Divider";
// import { LoginWithFbLink } from "./LoginWithFbLink";
import { ErrorMessage } from "./ErrorMessage";
import { ForgotPasswordLink } from "./ForgotPasswordLinkt";
import { SignupLink } from "./SignupLink";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

export const MainLogin = () => {
  const [error, setError] = useState("");

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between md:justify-center items-center gap-12 p-4 bg-[#0d1015] text-white">
      <div className="flex-1 w-full h-full flex justify-center items-center gap-16 p-4">
        <div className="hidden md:block">
          <img src="/ig-login-landing.png" alt="Login Image" />
        </div>
        <div className="w-xs flex flex-col justify-center items-center gap-12">
          <IgLabel />
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <LoginForm onError={setError} />
            <Divider />
            {/* <LoginWithFbLink /> */}
            {error && <ErrorMessage message={error} />}
            <ForgotPasswordLink />
          </div>
          <SignupLink />
        </div>
      </div>
      <Footer />
      {/* Snackbar */}
      <Toaster />
    </div>
  );
};
