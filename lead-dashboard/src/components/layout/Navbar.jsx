import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6 w-full">

      <button className="md:hidden text-xl" onClick={toggleSidebar}>
        ☰
      </button>

      <h2 className="text-lg font-semibold">Lead CRM</h2>

      <div className="flex items-center gap-4">

        {user ? (
          <>
            <span className="text-gray-700 text-sm font-medium">
              {user.name}
            </span>
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
              {user.name?.[0]?.toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Login
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;