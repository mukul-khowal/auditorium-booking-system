import React, { useContext, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getInitials } from "../../utils/helper";
import { Menu, MenuItem, Avatar } from "@mui/material";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
          <div className="p-6 text-2xl font-bold text-indigo-600">
            Auditorium
          </div>

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

            <button
              onClick={() => navigate("/dashboard/bookings")}
              className={`text-left px-4 py-2 rounded-lg hover:bg-indigo-50 ${isActive("/dashboard/bookings")}`}
            >
              Bookings
            </button>
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">
            {location.pathname.split("/")[2] || "Dashboard"}
          </h1>

          <div>
            <Avatar
              sx={{ bgcolor: "#4f46e5", cursor: "pointer" }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {getInitials(user?.name)}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <div className="px-4 py-2">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                Logout
              </MenuItem>
            </Menu>
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
