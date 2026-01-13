interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <div className="relative w-full mb-2">
      <input
        {...props}
        className="peer w-full bg-gray-800 border border-gray-600 rounded-sm px-2 pt-4 pb-1 text-xs focus:outline-none focus:border-gray-500 placeholder-transparent transition-all"
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
    </div>
  );
};
