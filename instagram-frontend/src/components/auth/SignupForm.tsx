import { SubmitButton } from "./SubmitButton";
import { TextField } from "./TextField";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { SignUpFormSchema, type SignUpFormType } from "../../validation/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROFILE_MUTATION } from "../../graphql/mutations/profile";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      displayName: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = handleSubmit(async (data: SignUpFormType) => {
    setLoading(true);
    try {
      const { data: response, error } = await signUp(data.email, data.password);

      if (error) throw error;

      if (response.user) {
        await createProfile({
          variables: {
            id: response.user.id,
            email: response.user.email,
            username: data.username,
            displayName: data.displayName,
          },
        });
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  return (
    <form onSubmit={handleSignUp} className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-col">
        <TextField
          label="Mobile Number or Email"
          type="text"
          {...register("email")}
          error={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <TextField
          label="Full Name"
          type="text"
          {...register("displayName")}
          error={errors.displayName?.message}
        />
        <TextField
          label="Username"
          type="text"
          {...register("username")}
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
