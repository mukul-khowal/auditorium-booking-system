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
import CreateHall from "./pages/Dashboard/CreateHall";
import EditHall from "./pages/Dashboard/EditHall";
import MyBookings from "./pages/Dashboard/MyBookings";
import AllBookings from "./pages/Dashboard/AllBookings";
import BookHall from "./pages/Dashboard/BookHall";

const App = () => {
  return (
    <UserProvider>
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

            <Route
              path="my-bookings"
              element={
                <ProtectedRoute allowedRoles={["FACULTY", "STUDENT"]}>
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="all-bookings"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AllBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="book/:hallId"
              element={
                <ProtectedRoute allowedRoles={["FACULTY", "STUDENT"]}>
                  <BookHall />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role?.toUpperCase())) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
