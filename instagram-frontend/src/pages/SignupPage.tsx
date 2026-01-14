import { Divider } from "../components/auth/Divider";
import { Footer } from "../components/auth/Footer";
import { IgLabel } from "../components/auth/Iglabel";
import { SignupForm } from "../components/auth/SignupForm";
import { LoginLink } from "../components/auth/links/LoginLink";
import { LoginWithFbLink } from "../components/auth/links/LoginWithFbLink";

const SignupPage = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between md:justify-center items-center gap-12 p-4 bg-[#0d1015] text-white">
      <div className="flex-1 w-full h-full flex flex-col justify-center items-center">
        <div className="w-sm flex flex-col justify-center items-center gap-3">
          <div className="w-full flex flex-col justify-center items-center gap-5 border-gray-800 border px-10 pb-6 pt-12">
            <IgLabel />
            <p className="text-md font-semibold text-gray-400 text-center">
              Sign up to see photos and videos from your friends.
            </p>
            <LoginWithFbLink />
            <Divider />
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <SignupForm />
            </div>
          </div>
          <div className="w-full border-gray-800 border p-5">
            <LoginLink />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
