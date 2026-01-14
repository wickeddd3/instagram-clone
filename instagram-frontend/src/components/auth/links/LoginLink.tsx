import { Link } from "react-router-dom";

export const LoginLink = () => {
  return (
    <Link
      to="/accounts/login"
      className="flex justify-center items-center gap-2 text-sm"
    >
      <span className="text-gray-200">Have an account?</span>
      <span className="text-indigo-400 font-semibold cursor-pointer">
        Log in
      </span>
    </Link>
  );
};
