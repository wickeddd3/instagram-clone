import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { TextField } from "./TextField";
import { SubmitButton } from "./SubmitButton";
import { useRegister } from "../model/useRegister";

export const SignupForm = ({
  onError,
}: {
  onError?: (value: string) => void;
}) => {
  const navigate = useNavigate();

  const { registerField, registerUser, loading, errors } = useRegister({
    onError,
    onSuccess: () => navigate("/"),
  });

  return (
    <form onSubmit={registerUser} className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-col">
        <TextField
          label="Mobile Number or Email"
          type="text"
          {...registerField("email")}
          error={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...registerField("password")}
          error={errors.password?.message}
        />
        <TextField
          label="Full Name"
          type="text"
          {...registerField("displayName")}
          error={errors.displayName?.message}
        />
        <TextField
          label="Username"
          type="text"
          {...registerField("username")}
          error={errors.username?.message}
        />
      </div>
      <p className="text-xs text-gray-500 text-center">
        People who use our service may have uploaded your contact information to
        Instagram. <span className="text-indigo-400">Learn More</span>
      </p>
      <p className="text-xs text-gray-500 text-center">
        By signing up, you agree to our{" "}
        <span className="text-indigo-400">Terms</span>,{" "}
        <span className="text-indigo-400">Privacy Policy</span> and{" "}
        <span className="text-indigo-400">Cookies Policy</span>
      </p>
      <SubmitButton disabled={loading}>
        {loading ? <Loader className="animate-spin" size={20} /> : "Sign up"}
      </SubmitButton>
    </form>
  );
};
