import { forwardRef, useId } from "react";

interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  type: "text" | "password";
  error?: string;
  label: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = "text", label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="relative w-full mb-2">
        <input
          {...props}
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`peer w-full bg-surface-hover border ${
            error ? "border-red-500" : "border-border"
          } rounded-sm px-2 pt-4 pb-1 text-xs text-foreground focus:outline-none focus:border-foreground placeholder-transparent transition-all`}
          placeholder={label}
        />
        <label
          htmlFor={inputId}
          className="absolute left-2 text-muted text-xs transition-all pointer-events-none
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
        {error && (
          <p id={errorId} role="alert" className="text-[10px] text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);
