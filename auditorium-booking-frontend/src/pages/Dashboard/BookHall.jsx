import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { TextField, Button, MenuItem } from "@mui/material";

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
        <TextField
          label="Event Coordinator Name"
          name="coordinatorName"
          value={formData.coordinatorName}
          disabled
        />

        <TextField
          label="Event Name"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
        />

        <TextField
          label="Organizing Club"
          name="organizingClub"
          value={formData.organizingClub}
          onChange={handleChange}
        />

        <TextField
          select
          label="Event Date Type"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
        >
          <MenuItem value="Half Day">Half Day</MenuItem>
          <MenuItem value="Full Day">Full Day</MenuItem>
        </TextField>

        <TextField
          type="date"
          name="date"
          label="Event Date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
          required
        />

        <TextField label="Hall Name" value={hall?.name || ""} disabled />

        <TextField
          type="time"
          name="startTime"
          label="Start Time"
          InputLabelProps={{ shrink: true }}
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <TextField
          type="time"
          name="endTime"
          label="End Time"
          InputLabelProps={{ shrink: true }}
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <TextField label="Institution" value={user?.institute} disabled />

        <TextField label="Department" value={user?.department} disabled />

        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <TextField
          label="Alternate Number"
          name="alternatePhone"
          value={formData.alternatePhone}
          onChange={handleChange}
        />

        <div className="col-span-2 text-center mt-6">
          <Button type="submit" variant="contained" size="large">
            Submit Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookHall;
