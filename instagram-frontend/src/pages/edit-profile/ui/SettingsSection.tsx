import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 md:p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
};
