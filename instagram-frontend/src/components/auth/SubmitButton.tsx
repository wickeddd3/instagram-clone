import type { ReactNode } from "react";

interface SubmitButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export const SubmitButton = ({
  label,
  disabled = false,
  onClick,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold flex justify-center items-center rounded-md p-1.5 w-full cursor-pointer ${className}`}
    >
      {children}
      {label}
    </button>
  );
};
