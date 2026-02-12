import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const EditHall = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hall, setHall] = useState({
    name: "",
    capacity: "",
    amenities: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchHall = async () => {
      const res = await axiosInstance.get(`/api/v1/halls/${id}`);
      setHall(res.data);
    };

    fetchHall();
  }, [id]);

  const handleChange = (e) => {
    setHall({ ...hall, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axiosInstance.put(`/api/v1/halls/${id}`, hall);

    navigate("/dashboard/halls");
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit <span className="text-indigo-600">Hall</span>
      </h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <input
          name="name"
          value={hall.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="capacity"
          value={hall.capacity}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="amenities"
          value={hall.amenities}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="location"
          value={hall.location}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="description"
          value={hall.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <button className="px-6 py-2 bg-indigo-600 text-white rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditHall;
