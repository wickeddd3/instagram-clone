import type { ReactNode } from "react";

export const PostsEmpty = ({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title?: String;
  subtitle?: String;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-12">
      <span className="border border-gray-50 rounded-full p-3">{icon}</span>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="font-light text-center">{subtitle}</p>
    </div>
  );
};
