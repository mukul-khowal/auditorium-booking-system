import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  const [stats, setStats] = useState({
    totalHalls: 0,
    totalBookings: 0,
    pending: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch halls
        const hallsRes = await axiosInstance.get(
          user?.role === "ADMIN" ? "/api/v1/halls" : "/api/v1/halls/available",
        );

        // Fetch bookings
        const bookingsRes = await axiosInstance.get(
          user?.role === "ADMIN" ? "/api/v1/bookings" : "/api/v1/bookings/my",
        );

        const bookings = bookingsRes.data;

        setStats({
          totalHalls: hallsRes.data.length,
          totalBookings: bookings.length,
          pending: bookings.filter((b) => b.status === "PENDING").length,
        });

        setRecentBookings(bookings.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">Welcome {user?.name}</h2>
        <p className="text-gray-500 mt-2">
          Manage halls and bookings from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Halls</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {stats.totalHalls}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Bookings</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.totalBookings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Pending Requests</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {stats.pending}
          </p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-sm text-gray-500">Hall</th>
                <th className="py-3 px-4 text-sm text-gray-500">Date</th>
                <th className="py-3 px-4 text-sm text-gray-500">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{booking.hallName}</td>

                  <td className="py-3 px-4">
                    {new Date(booking.startTime).toLocaleDateString()}
                    <br />
                    <span className="text-sm text-gray-500">
                      {new Date(booking.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(booking.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        booking.status === "APPROVED"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
