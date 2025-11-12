// order table list
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";

const OrderList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // fetch order
  const {data,isLoading,isError,error} = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
        const response = await apiRequest.get('/orders/')
        return response.data
    }
  })

  console.log(data)

  return (
    <div className="min-h-screen container my-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Order List</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">#ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Customer</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Phone</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Payment</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total ($)</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {
            isLoading ? <tr>
                <td>loading....</td>
            </tr> :
            isError ? <tr>
                <td>{error.message}</td>
            </tr>
            :
            data.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.full_name}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4 capitalize">{order.payment}</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">${order.total_price}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {expandedOrder === order.id ? "Hide Items" : "View Items"}
                    </button>
                  </td>
                </tr>

                {expandedOrder === order.id && (
                  <tr className="bg-gray-50 border-t">
                    <td colSpan={8} className="p-4">
                      {order.items.length > 0 ? (
                        <div>
                          <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
                          <ul className="space-y-2">
                            {order.items.map((item) => (
                              <li
                                key={item.id}
                                className="flex justify-between border rounded-lg p-3 bg-white shadow-sm"
                              >
                                <div>
                                  <p className="font-medium text-gray-800">{item.product_name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-700">${item.price}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No items in this order.</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;