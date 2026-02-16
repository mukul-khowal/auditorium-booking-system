import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";

const BookHall = () => {
  const { hallId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [hall, setHall] = useState(null);

  const [formData, setFormData] = useState({
    coordinatorName: user?.name || "",
    eventName: "",
    organizingClub: "",
    eventType: "Half Day",
    date: "",
    startTime: "",
    endTime: "",
    phone: "",
    alternatePhone: "",
  });

  useEffect(() => {
    const fetchHall = async () => {
      const res = await axiosInstance.get(`/api/v1/halls/${hallId}`);
      setHall(res.data);
    };
    fetchHall();
  }, [hallId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.startTime >= formData.endTime) {
      alert("End time must be after start time");
      return;
    }

    const formattedStartTime = `${formData.date}T${formData.startTime}:00`;
    const formattedEndTime = `${formData.date}T${formData.endTime}:00`;

    await axiosInstance.post("/api/v1/bookings", {
      hallId: Number(hallId),
      eventName: formData.eventName,
      organizingClub: formData.organizingClub,
      eventType: formData.eventType.toUpperCase().replace(" ", "_"),
      phone: formData.phone,
      alternatePhone: formData.alternatePhone,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    });

    navigate("/dashboard/my-bookings");
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Book Hall
        </p>
        <h1 className="text-4xl font-bold mt-2">
          Book Your <span className="text-indigo-600">Hall</span> Now
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Event Coordinator Name
          </label>
          <input
            type="text"
            name="coordinatorName"
            value={formData.coordinatorName}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Organizing Club
          </label>
          <input
            type="text"
            name="organizingClub"
            value={formData.organizingClub}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Event Date Type
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
          >
            <option value="Half Day">Half Day</option>
            <option value="Full Day">Full Day</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Event Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Hall Name
          </label>
          <input
            type="text"
            value={hall?.name || ""}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            value={user?.institute}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            value={user?.department}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Alternate Number
          </label>
          <input
            type="tel"
            name="alternatePhone"
            value={formData.alternatePhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="col-span-2 text-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookHall;
