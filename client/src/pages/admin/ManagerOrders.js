import React, { useEffect, useState } from "react";
import { apiGetOrderByAdmin } from "../../apis/user";
import { TableRow } from "../../components";

function ManagerOrders() {
  const [orders, setOrders] = useState({});
  const handleStatus = (id) => {
    console.log("status:", id);
    // Implement editing logic here
  };
  const handleEdit = (id) => {
    console.log("Edit:", id);
    // Implement editing logic here
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
    // Implement deletion logic here
  };

  const handleView = (id) => {
    console.log("View:", id);
    // Implement view logic here
  };

  const getAllOrder = async () => {
    const response = await apiGetOrderByAdmin();
    if (response.success) setOrders(response.orders);
  };

  useEffect(() => {
    // console.log(orders);
    getAllOrder();
  }, []);
  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Orders By
            </th>
            <th scope="col" className="px-6 py-3">
              Guest Name
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            Object.values(orders).map((order) => {
              // Check the contents of each order
              return (
                <TableRow
                  key={order._id}
                  keyName={order}
                  onStatus={handleStatus}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerOrders;
