import { Divider } from "./Divider";
import { Footer } from "./Footer";
import { IgLabel } from "./Iglabel";
import { LoginForm } from "./LoginForm";
import { ForgotPasswordLink } from "./links/ForgotPasswordLinkt";
import { LoginWithFbLink } from "./links/LoginWithFbLink";
import { NoAccountLink } from "./links/NoAccountLink";

export const MainLogin = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between md:justify-center items-center gap-12 p-4 bg-[#0d1015] text-white">
      <div className="flex-1 w-full h-full flex justify-center items-center gap-16 p-4">
        <div className="hidden md:block">
          <img src="/ig-login-landing.png" alt="Login Image" />
        </div>
        <div className="w-xs flex flex-col justify-center items-center gap-12">
          <IgLabel />
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <LoginForm />
            <Divider />
            <LoginWithFbLink />
            <ForgotPasswordLink />
          </div>
          <NoAccountLink />
        </div>
      </div>
      <Footer />
    </div>
  );
};
