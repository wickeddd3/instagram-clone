interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const SubmitButton = ({
  label,
  onClick,
  className,
}: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold rounded-md p-1.5 w-full ${className}`}
    >
      {label}
    </button>
  );
};
