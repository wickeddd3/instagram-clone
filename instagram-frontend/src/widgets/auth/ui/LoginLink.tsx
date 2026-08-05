import { Link } from "react-router-dom";

export const LoginLink = () => {
  return (
    <Link
      to="/accounts/login"
      className="flex justify-center items-center gap-2 text-sm"
    >
      <span className="text-muted">Have an account?</span>
      <span className="text-primary font-semibold cursor-pointer">
        Log in
      </span>
    </Link>
  );
};
