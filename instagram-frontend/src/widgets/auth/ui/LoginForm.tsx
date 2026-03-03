import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { TextField } from "./TextField";
import { SubmitButton } from "./SubmitButton";
import { useLogin } from "../model/useLogin";

export const LoginForm = ({
  onError,
}: {
  onError?: (value: string) => void;
}) => {
  const navigate = useNavigate();

  const { registerField, loginUser, loading, errors } = useLogin({
    onError,
    onSuccess: () => navigate("/"),
  });

  return (
    <form onSubmit={loginUser} className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-col">
        <TextField
          label="Phone number, username, or email"
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
      </div>
      <SubmitButton disabled={loading}>
        {loading ? <Loader className="animate-spin" size={20} /> : "Log in"}
      </SubmitButton>
    </form>
  );
};
