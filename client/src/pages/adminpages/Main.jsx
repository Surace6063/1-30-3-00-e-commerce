import { Box, ShoppingCart, Users, Plus } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

const Main = () => {
  const stats = [
    { title: "Products", value: 120, icon: <Box className="text-slate-500" /> },
    { title: "Orders", value: 45, icon: <ShoppingCart className="text-slate-500" /> },
    { title: "Users", value: 300, icon: <Users className="text-slate-500" /> },
  ];

  const recentOrders = [
    { id: 1, customer: "John Doe", total: "$1200", status: "Pending" },
    { id: 2, customer: "Jane Smith", total: "$450", status: "Completed" },
    { id: 3, customer: "Mike Johnson", total: "$780", status: "Pending" },
  ];

  // Sample chart data
  const chartData = [
    { day: "Mon", orders: 12 },
    { day: "Tue", orders: 19 },
    { day: "Wed", orders: 7 },
    { day: "Thu", orders: 15 },
    { day: "Fri", orders: 20 },
    { day: "Sat", orders: 10 },
    { day: "Sun", orders: 25 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center justify-between bg-white border border-slate-200 shadow rounded-lg p-6 hover:shadow transition"
          >
            <div>
              <h3 className="text-slate-500 font-medium">{stat.title}</h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Orders Chart */}
      {/* <div className="bg-white shadowunded-lg border border-slate-200 p-6">
        <h3 className="text-slate-800 font-semibold mb-4">Orders This Week</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#1e293b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* Recent Orders Table */}
      <div className="bg-white shadowunded-lg border border-slate-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-slate-700">Order ID</th>
              <th className="px-6 py-3 text-left text-slate-700">Customer</th>
              <th className="px-6 py-3 text-left text-slate-700">Total</th>
              <th className="px-6 py-3 text-left text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 text-slate-700">{order.id}</td>
                <td className="px-6 py-3 text-slate-700">{order.customer}</td>
                <td className="px-6 py-3 text-slate-700">{order.total}</td>
                <td
                  className={`px-6 py-3 font-medium ${
                    order.status === "Completed" ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-6 py-3 text-slate-700">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Main