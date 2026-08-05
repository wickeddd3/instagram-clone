import { Loader } from "lucide-react";
import { TextField, SubmitButton } from "@/shared/ui";
import { useRegister } from "../model/useRegister";

export const SignupForm = ({
  onError,
  onSuccess,
}: {
  onError?: (value: string) => void;
  onSuccess?: (email: string) => void;
}) => {
  const { registerField, registerUser, loading, errors } = useRegister({
    onError,
    onSuccess,
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
      <p className="text-xs text-muted text-center">
        People who use our service may have uploaded your contact information to
        Instagram. <span className="text-primary">Learn More</span>
      </p>
      <p className="text-xs text-muted text-center">
        By signing up, you agree to our{" "}
        <span className="text-primary">Terms</span>,{" "}
        <span className="text-primary">Privacy Policy</span> and{" "}
        <span className="text-primary">Cookies Policy</span>
      </p>
      <SubmitButton disabled={loading}>
        {loading ? (
          <Loader className="animate-spin" size={20} aria-label="Signing up" />
        ) : (
          "Sign up"
        )}
      </SubmitButton>
    </form>
  );
};
