import { Facebook } from "lucide-react";

export const LoginWithFbLink = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="bg-blue-600 rounded-full p-0.5">
        <Facebook size={18} />
      </div>
      <span className="text-blue-600 text-sm font-semibold">
        {" "}
        Log in with Facebook
      </span>
    </div>
  );
};
