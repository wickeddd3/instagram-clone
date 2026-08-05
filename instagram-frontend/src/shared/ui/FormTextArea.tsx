import { forwardRef, useId, type ReactNode } from "react";

interface FormTextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange"
  > {
  label: string;
  error?: string;
  helper?: ReactNode;
}

// Multi-line counterpart of FormField, sharing its label-above, roomy design.
export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, error, helper, id, rows = 3, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="font-semibold text-sm">
          {label}
        </label>
        <textarea
          {...props}
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full resize-none bg-background border ${
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
