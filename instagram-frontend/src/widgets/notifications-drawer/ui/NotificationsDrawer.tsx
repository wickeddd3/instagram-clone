import { Bell } from "lucide-react";

export const NotificationsDrawer = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Notifications</h2>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <Bell size={60} />
          <h2 className="text-2xl font-bold">Notification</h2>
          <p className="text-lg font-light">Coming soon</p>
        </div>
      </div>
    </div>
  );
};
