import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Leads", path: "/leads" },
    { name: "Add Lead", path: "/add-lead" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-8">Lead CRM</h1>
      <ul className="space-y-2 flex-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`block px-3 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;