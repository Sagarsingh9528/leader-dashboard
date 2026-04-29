const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6 w-full">
      <button
        className="md:hidden text-xl"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <h2 className="text-lg font-semibold">Lead CRM</h2>

      <div className="flex items-center gap-3">
        <span className="text-gray-600 text-sm">Admin</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          👤
        </div>
      </div>
    </div>
  );
};

export default Navbar;