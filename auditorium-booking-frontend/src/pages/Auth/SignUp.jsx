import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { institutions, InstitutionList } from "../../utils/Institutions.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { validateEmail } from "../../utils/helper.js";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    adminKey: "",
    institution: "",
    department: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      userType,
      password,
      cpassword,
      institution,
      department,
    } = user;

    if (!name || !email || !password || !userType)
      return setError("Please fill all required fields");

    if (!validateEmail(email)) return setError("Invalid email address");

    if (password !== cpassword) return setError("Passwords do not match");

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        phone,
        role: userType.toUpperCase(),
        institute: institution,
        department,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="text-gray-600 body-font w-screen h-screen flex items-center justify-center bg-transparent">
        <div className="w-full max-w-lg bg-white shadow-2xl shadow-blue-100 rounded-xl p-8 flex flex-col">
          <form onSubmit={PostData}>
            <h3 className="text-3xl mb-6 font-extrabold tracking-tight text-gray-900">
              Sign <span className="text-indigo-600">Up</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputs}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Enter your name"
                />
              </div>

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
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Enter your phone"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Your Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="userType"
                  value={user.userType}
                  onChange={handleInputs}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select Role</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="ADMIN">Admin</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>
            </div>

            {user.userType !== "ADMIN" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="institution"
                    value={user.institution}
                    onChange={handleInputs}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Select Institution</option>
                    {Object.keys(InstitutionList).map((key) => (
                      <option key={key} value={key}>
                        {InstitutionList[key]}
                      </option>
                    ))}
                  </select>
                </div>

                {user.institution && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="department"
                      value={user.department}
                      onChange={handleInputs}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Department</option>
                      {institutions
                        .find(
                          (inst) =>
                            inst.name === InstitutionList[user.institution],
                        )
                        ?.departments.map((dept, idx) => (
                          <option key={idx} value={dept}>
                            {dept}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-5 mb-6">
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

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Confirm your password"
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
                "SIGN UP"
              )}
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default SignUp;
