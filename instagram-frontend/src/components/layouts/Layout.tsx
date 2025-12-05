import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Left Sidebar - Hidden on Mobile */}
      <aside className="hidden md:flex md:w-[72px] lg:w-[245px] flex-col border-r border-gray-800 h-screen sticky top-0 z-50">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
