import { Link } from "react-router-dom";

export const SignupLink = () => {
  return (
    <Link
      to="/accounts/signup"
      className="flex justify-center items-center gap-2 text-sm"
    >
      <span className="text-gray-200">Don't have an account?</span>
      <span className="text-indigo-400 font-semibold cursor-pointer">
        Sign up
      </span>
    </Link>
  );
};
