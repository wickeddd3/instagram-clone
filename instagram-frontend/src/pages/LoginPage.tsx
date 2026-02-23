import {
  Divider,
  ErrorMessage,
  Footer,
  ForgotPasswordLink,
  IgLabel,
  LoginForm,
  LoginWithFbLink,
  SignupLink,
} from "@/widgets/auth";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between md:justify-center items-center gap-12 p-4 bg-[#0d1015] text-white">
      <div className="flex-1 w-full h-full flex flex-col justify-center items-center">
        <div className="w-sm flex flex-col justify-center items-center gap-3">
          <div className="w-full flex flex-col justify-center items-center gap-12 border-gray-800 border px-10 pb-6 pt-12">
            <IgLabel />
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <LoginForm onError={setError} />
              <Divider />
              <LoginWithFbLink />
              {error && <ErrorMessage message={error} />}
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
