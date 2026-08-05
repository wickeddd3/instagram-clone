import { Link } from "react-router-dom";

export const SignupLink = () => {
  return (
    <Link
      to="/accounts/signup"
      className="flex justify-center items-center gap-2 text-sm"
    >
      <span className="text-muted">Don't have an account?</span>
      <span className="text-primary font-semibold cursor-pointer">
        Sign up
      </span>
    </Link>
  );
};
