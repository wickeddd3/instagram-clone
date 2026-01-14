import { useState } from "react";
import { Divider } from "./Divider";
import { ErrorMessage } from "./ErrorMessage";
import { Footer } from "./Footer";
import { IgLabel } from "./Iglabel";
import { LoginForm } from "./LoginForm";
import { ForgotPasswordLink } from "./links/ForgotPasswordLinkt";
import { LoginWithFbLink } from "./links/LoginWithFbLink";
import { SignupLink } from "./links/SignupLink";

export const MainLogin = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between md:justify-center items-center gap-12 p-4 bg-[#0d1015] text-white">
      <div className="flex-1 w-full h-full flex justify-center items-center gap-16 p-4">
        <div className="hidden md:block">
          <img src="/ig-login-landing.png" alt="Login Image" />
        </div>
        <div className="w-xs flex flex-col justify-center items-center gap-12">
          <IgLabel />
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <LoginForm onError={setHasError} />
            <Divider />
            <LoginWithFbLink />
            {hasError && (
              <ErrorMessage message="Sorry, your password was incorrect. Please double-check your password." />
            )}
            <ForgotPasswordLink />
          </div>
          <SignupLink />
        </div>
      </div>
      <Footer />
    </div>
  );
};
