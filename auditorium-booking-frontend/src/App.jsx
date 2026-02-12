import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import UserProvider, { UserContext } from "./context/UserContext";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Halls from "./pages/Dashboard/Halls";
import Bookings from "./pages/Dashboard/Bookings";
import CreateHall from "./pages/Dashboard/CreateHall";
import EditHall from "./pages/Dashboard/EditHall";

const App = () => {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="halls" element={<Halls />} />
              <Route path="bookings" element={<Bookings />} />
              <Route
                path="create-hall"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <CreateHall />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit-hall/:id"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <EditHall />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const { user, loading } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role?.toUpperCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
