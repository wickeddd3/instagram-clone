import { SubmitButton } from "./SubmitButton";
import { TextField } from "./TextField";

export const LoginForm = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-col">
        <TextField label="Phone number, username, or email" type="text" />
        <TextField label="Password" type="password" />
      </div>
      <SubmitButton label="Log in" onClick={() => {}} />
    </div>
  );
};
