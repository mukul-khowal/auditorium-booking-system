import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@mui/material";
import AuthLayout from "../../components/layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
 

const Login = () => {
  const { updateUser } = useContext(UserContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email || !password) return setError("Please enter email and password");

    if (!validateEmail(email)) return setError("Invalid email address");

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        const userInfo = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        updateUser(userInfo.data);

        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="text-gray-600 body-font w-screen h-screen flex items-center justify-center bg-transparent">
        <div className="w-full max-w-md bg-white shadow-2xl shadow-blue-100 rounded-xl p-8 flex flex-col">
          <form onSubmit={handleLogin}>
            <h3 className="text-3xl mb-6 font-extrabold tracking-tight text-gray-900">
              Log <span className="text-indigo-600">In</span>
            </h3>

            <div className="flex flex-col gap-5 mb-6">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={user.email}
                onChange={handleInputs}
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={user.password}
                onChange={handleInputs}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold mb-4">{error}</p>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: "#4f46e5",
                "&:hover": { backgroundColor: "#4338ca" },
                py: 1.5,
                fontWeight: "bold",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "LOGIN"
              )}
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Login;
