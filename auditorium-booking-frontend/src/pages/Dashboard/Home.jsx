import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Home = () => {
  return (
      <div className="space-y-6">

        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Auditorium Dashboard
          </h2>
          <p className="text-gray-500 mt-2">
            Manage halls, bookings and availability from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Halls</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">24</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Pending Requests</h3>
            <p className="text-3xl font-bold text-red-500 mt-2">3</p>
          </div>

        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-sm text-gray-500">Hall</th>
                  <th className="py-3 px-4 text-sm text-gray-500">Date</th>
                  <th className="py-3 px-4 text-sm text-gray-500">Time</th>
                  <th className="py-3 px-4 text-sm text-gray-500">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Main Auditorium</td>
                  <td className="py-3 px-4">12 Feb 2026</td>
                  <td className="py-3 px-4">10:00 AM</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                      Approved
                    </span>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Seminar Hall</td>
                  <td className="py-3 px-4">14 Feb 2026</td>
                  <td className="py-3 px-4">2:00 PM</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
  );
};

export default Home;
