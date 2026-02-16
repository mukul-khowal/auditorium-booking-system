import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axiosInstance.get("/api/v1/bookings/my");
      setBookings(res.data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white p-6 rounded shadow mb-4">
          <p>
            <b>Hall:</b> {booking.hallName}
          </p>

          <p>
            <b>Date:</b> {new Date(booking.startTime).toLocaleDateString()}
          </p>

          <p>
            <b>Time:</b>{" "}
            {new Date(booking.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(booking.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <b>Status:</b> {booking.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
