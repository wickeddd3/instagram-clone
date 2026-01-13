import { forwardRef } from "react";

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  type: "text" | "password";
  error?: string;
  label: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = "text", label, error, ...props }, ref) => {
    return (
      <div className="relative w-full mb-2">
        <input
          {...props}
          ref={ref}
          type={type}
          className={`peer w-full bg-gray-800 border ${
            error ? "border-red-500" : "border-gray-700"
          } rounded-sm px-2 pt-4 pb-1 text-xs text-white focus:outline-none focus:border-gray-500 placeholder-transparent transition-all`}
          placeholder={label}
        />
        <label
          className="absolute left-2 text-gray-500 text-xs transition-all pointer-events-none
        top-3 
        peer-placeholder-shown:top-2.5 
        peer-placeholder-shown:text-sm 
        peer-focus:top-1 
        peer-focus:text-[10px] 
        peer-[:not(:placeholder-shown)]:top-1 
        peer-[:not(:placeholder-shown)]:text-[10px]"
        >
          {label}
        </label>
        {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);
