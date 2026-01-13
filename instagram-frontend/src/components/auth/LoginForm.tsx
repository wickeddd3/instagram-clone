import { SubmitButton } from "./SubmitButton";
import { TextField } from "./TextField";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { LoginFormSchema, type LoginFormType } from "../../validation/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader } from "lucide-react";

interface LoginFormProps {
  onError: (value: boolean) => void;
}

export const LoginForm = ({ onError }: LoginFormProps) => {
  const { signIn } = useAuth();

  const { register, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = handleSubmit(async (data: LoginFormType) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      setLoading(false);
      onError(false);
      if (error) {
        onError(true);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  return (
    <form onSubmit={handleLogin} className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-col">
        <TextField
          label="Phone number, username, or email"
          type="text"
          {...register("email")}
        />
        <TextField label="Password" type="password" {...register("password")} />
      </div>
      <SubmitButton disabled={loading}>
        {loading ? <Loader className="animate-spin" size={20} /> : "Log in"}
      </SubmitButton>
    </form>
  );
};
