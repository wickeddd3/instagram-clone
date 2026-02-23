interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  return (
    <p className={`text-red-400 text-sm text-balance text-center ${className}`}>
      {message}
    </p>
  );
};
