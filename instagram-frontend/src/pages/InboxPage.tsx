import { MessageCircle } from "lucide-react";

const InboxPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <MessageCircle size={60} />
        <h2 className="text-2xl font-bold">CHAT MESSAGE</h2>
        <p className="text-lg font-light">Coming soon</p>
      </div>
    </div>
  );
};

export default InboxPage;
