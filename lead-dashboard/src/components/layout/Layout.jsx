import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">

      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:block`}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </div>

     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col w-full md:ml-2">

        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        <main className="flex-1 p-4 sm:p-6 w-full">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;