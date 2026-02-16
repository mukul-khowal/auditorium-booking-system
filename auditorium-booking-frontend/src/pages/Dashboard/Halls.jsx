import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Available <span className="text-indigo-600">Halls</span>
        </h1>

        {isAdmin && (
          <button
            onClick={() => navigate("/dashboard/create-hall")}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Create Hall
          </button>
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
              <button
                onClick={() => navigate(`/dashboard/book/${hall.id}`)}
                className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-200"
              >
                Book Now
              </button>
            )}

            {isAdmin && (
              <>
                <button
                  onClick={() => navigate(`/dashboard/edit-hall/${hall.id}`)}
                  className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(hall.id)}
                  className="px-6 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition duration-200"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Halls;
