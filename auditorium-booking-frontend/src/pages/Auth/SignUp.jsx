import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import AuthLayout from "../../components/layouts/AuthLayout";
import {
  institutions,
  InstitutionList,
  DepartmentList,
} from "../../utils/Institutions.js";
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

    if (!validateEmail(email))
      return setError("Invalid email address");

    if (password !== cpassword)
      return setError("Passwords do not match");

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          name,
          email,
          phone,
          role: userType.toUpperCase(),
          institute: institution,
          department,
          password,
        }
      );

      if (response.status === 201 || response.data.token) {
        navigate("/login");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="text-gray-600 body-font min-h-screen flex items-center justify-center bg-transparent">
        <div className="w-full max-w-lg bg-white shadow-2xl shadow-blue-100 rounded-xl p-8 flex flex-col">
          <form onSubmit={PostData}>
            <h3 className="text-3xl mb-6 font-extrabold tracking-tight text-gray-900">
              Sign <span className="text-indigo-600">Up</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={user.name}
                onChange={handleInputs}
                required
              />

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
                label="Phone"
                name="phone"
                variant="outlined"
                value={user.phone}
                onChange={handleInputs}
              />

              <FormControl fullWidth required>
                <InputLabel>Your Role</InputLabel>
                <Select
                  name="userType"
                  value={user.userType}
                  label="Your Role"
                  onChange={handleInputs}
                >
                  <MenuItem value="FACULTY">Faculty</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="STUDENT">Student</MenuItem>
                </Select>
              </FormControl>
            </div>

            {user.userType !== "ADMIN" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormControl fullWidth required>
                  <InputLabel>Institution</InputLabel>
                  <Select
                    name="institution"
                    value={user.institution}
                    label="Institution"
                    onChange={handleInputs}
                  >
                    {Object.keys(InstitutionList).map((key) => (
                      <MenuItem key={key} value={key}>
                        {InstitutionList[key]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {user.institution && (
                  <FormControl fullWidth required>
                    <InputLabel>Department</InputLabel>
                    <Select
                      name="department"
                      value={user.department}
                      label="Department"
                      onChange={handleInputs}
                    >
                      {institutions
                        .find(
                          (inst) =>
                            inst.name === InstitutionList[user.institution]
                        )
                        ?.departments.map((dept, idx) => (
                          <MenuItem key={idx} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            )}

            <div className="flex flex-col gap-5 mb-6">
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

              <TextField
                fullWidth
                label="Confirm Password"
                name="cpassword"
                type="password"
                variant="outlined"
                value={user.cpassword}
                onChange={handleInputs}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold mb-4">
                {error}
              </p>
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
                "SIGN UP"
              )}
            </Button>

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
