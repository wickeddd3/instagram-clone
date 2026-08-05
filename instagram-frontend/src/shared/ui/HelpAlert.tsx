import { InfoIcon } from "lucide-react";

export function HelpAlert() {
  return (
    <div
      className="bg-teal-500/10 border-t-4 border-teal-500 rounded-b text-teal-800 dark:text-teal-100 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <InfoIcon
          size={26}
          className="text-teal-600 dark:text-teal-400 mr-4"
          aria-hidden="true"
        />
        <div className="text-xs">
          <p className="font-bold text-pretty">
            If you're hesitant to signup you can use these credentials for demo
            purposes.
          </p>
          <ul className="list-disc md:list-inside pt-2">
            <li>frances.stiedemann77@example.com - password123</li>
            <li>hayden_koepp28@example.com - password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
