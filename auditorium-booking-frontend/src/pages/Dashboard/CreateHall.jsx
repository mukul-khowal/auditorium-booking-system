import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const CreateHall = () => {
  const navigate = useNavigate();

  const [hall, setHall] = useState({
    name: "",
    capacity: "",
    amenities: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHall({ ...hall, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axiosInstance.post("/api/v1/halls", hall);

      navigate("/dashboard/halls");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Create Hall
        </p>
        <h1 className="text-4xl font-bold mt-2">
          Create Your <span className="text-indigo-600">Hall</span>
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Hall Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Hall Name"
              value={hall.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={hall.capacity}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Amenities
            </label>
            <input
              type="text"
              name="amenities"
              placeholder="Amenities"
              value={hall.amenities}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={hall.location}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={hall.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateHall;
