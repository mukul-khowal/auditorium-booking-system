import React, { useContext, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getInitials } from "../../utils/helper";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearUser } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-indigo-50 text-indigo-600" : "";

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          {user.role === "ADMIN" ? (
            <div className="p-6 text-2xl font-bold text-red-600">ADMIN</div>
          ) : (
            <div className="p-6 text-2xl font-bold text-indigo-600">
              Auditorium
            </div>
          )}

          <nav className="flex flex-col gap-2 px-4">
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-left px-4 py-2 rounded-lg hover:bg-indigo-50 ${isActive("/dashboard")}`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard/halls")}
              className={`text-left px-4 py-2 rounded-lg hover:bg-indigo-50 ${isActive("/dashboard/halls")}`}
            >
              Halls
            </button>

            {user?.role === "ADMIN" ? (
              <button
                onClick={() => navigate("/dashboard/all-bookings")}
                className={`text-left px-4 py-2 rounded-lg hover:bg-indigo-50 ${isActive("/dashboard/all-bookings")}`}
              >
                All Bookings
              </button>
            ) : (
              <button
                onClick={() => navigate("/dashboard/my-bookings")}
                className={`text-left px-4 py-2 rounded-lg hover:bg-indigo-50 ${isActive("/dashboard/my-bookings")}`}
              >
                My Bookings
              </button>
            )}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">
            {location.pathname.split("/")[2] || "Dashboard"}
          </h1>

          <div className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-indigo-700 transition"
            >
              {getInitials(user?.name)}
            </div>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-sm text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
