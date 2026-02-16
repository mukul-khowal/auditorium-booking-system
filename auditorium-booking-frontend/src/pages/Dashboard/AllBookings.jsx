import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Button } from "@mui/material";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axiosInstance.get("/api/v1/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await axiosInstance.patch(`/api/v1/bookings/${id}?status=${status}`);
    fetchBookings();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">All Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white p-6 rounded shadow mb-4">
          <p>
            <b>User:</b> {booking.userName}
          </p>

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
            })}{" "}
            -{" "}
            {new Date(booking.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <b>Status:</b> {booking.status}
          </p>

          {booking.status === "PENDING" && (
            <div className="flex gap-3 mt-3">
              <Button
                color="success"
                onClick={() => updateStatus(booking.id, "APPROVED")}
              >
                Approve
              </Button>

              <Button
                color="error"
                onClick={() => updateStatus(booking.id, "REJECTED")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllBookings;
