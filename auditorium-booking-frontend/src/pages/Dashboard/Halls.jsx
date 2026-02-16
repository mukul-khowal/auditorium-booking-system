import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Halls = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "ADMIN";

  // Fetch halls based on role
  const fetchHalls = async () => {
    try {
      const url = isAdmin ? "/api/v1/halls" : "/api/v1/halls/available";

      const res = await axiosInstance.get(url);
      setHalls(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  // Delete Hall
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hall?")) return;

    try {
      await axiosInstance.delete(`/api/v1/halls/${id}`);
      fetchHalls();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Available <span className="text-indigo-600">Halls</span>
        </h1>

        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/create-hall")}
          >
            Create Hall
          </Button>
        )}
      </div>

      {halls.map((hall) => (
        <div key={hall.id} className="bg-white p-8 rounded-2xl shadow">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">{hall.name}</h2>
            <span className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-600 text-sm">
              Capacity: {hall.capacity}
            </span>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p>{hall.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Amenities</p>
              <p>{hall.amenities}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Description</p>
            <p>{hall.description}</p>
          </div>

          <div className="flex gap-4 mt-6">
            {!isAdmin && (
              <Button
                variant="outlined"
                onClick={() => navigate(`/dashboard/book/${hall.id}`)}
              >
                Book Now
              </Button>
            )}

            {isAdmin && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/dashboard/edit-hall/${hall.id}`)}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => handleDelete(hall.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Halls;
