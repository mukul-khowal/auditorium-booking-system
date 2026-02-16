import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                "LOGIN"
              )}
            </button>

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
