import { type ReactNode } from "react";
import { InfoIcon, CheckCircle2, AlertCircle, X } from "lucide-react";

type AlertVariant = "info" | "success" | "error";

const VARIANTS: Record<
  AlertVariant,
  { Icon: typeof InfoIcon; container: string; icon: string }
> = {
  info: {
    Icon: InfoIcon,
    container: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-100",
    icon: "text-sky-600 dark:text-sky-400",
  },
  success: {
    Icon: CheckCircle2,
    container:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-100",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  error: {
    Icon: AlertCircle,
    container:
      "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-100",
    icon: "text-rose-600 dark:text-rose-400",
  },
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert = ({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
}: AlertProps) => {
  const { Icon, container, icon } = VARIANTS[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex w-full items-start gap-3 rounded-md border px-4 py-3 ${container} ${className}`}
    >
      <Icon size={20} className={`mt-0.5 shrink-0 ${icon}`} aria-hidden="true" />
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-xs opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="-mr-1 shrink-0 rounded p-0.5 opacity-70 transition hover:opacity-100"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
