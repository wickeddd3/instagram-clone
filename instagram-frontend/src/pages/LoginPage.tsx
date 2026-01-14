import { useState } from "react";
import { Divider } from "../components/auth/Divider";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { Footer } from "../components/auth/Footer";
import { IgLabel } from "../components/auth/Iglabel";
import { LoginForm } from "../components/auth/LoginForm";
import { ForgotPasswordLink } from "../components/auth/links/ForgotPasswordLinkt";
import { LoginWithFbLink } from "../components/auth/links/LoginWithFbLink";
import { SignupLink } from "../components/auth/links/SignupLink";

const LoginPage = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between md:justify-center items-center gap-12 p-4 bg-[#0d1015] text-white">
      <div className="flex-1 w-full h-full flex flex-col justify-center items-center">
        <div className="w-sm flex flex-col justify-center items-center gap-3">
          <div className="w-full flex flex-col justify-center items-center gap-12 border-gray-800 border px-10 pb-6 pt-12">
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
          </div>
          <div className="w-full border-gray-800 border p-5">
            <SignupLink />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
