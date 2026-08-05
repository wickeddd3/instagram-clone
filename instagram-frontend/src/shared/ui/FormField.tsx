import { forwardRef, useId, type ReactNode } from "react";

interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  type?: "text" | "password" | "email" | "url";
  error?: string;
  helper?: ReactNode;
}

// Label-above, roomy input used across the account settings forms. Kept as a
// shared component so profile, email, and password fields stay identical.
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, type = "text", error, helper, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="font-semibold text-sm">
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full bg-background border ${
            error ? "border-red-500" : "border-border"
          } rounded-xl p-4 text-sm focus:border-foreground outline-none transition-colors`}
        />
        {helper && <p className="text-xs text-muted">{helper}</p>}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);
