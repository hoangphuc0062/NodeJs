import React from "react";
import formatNumber from "../ultils/formatNumber";

function TableRow({ keyName, onEdit, onDelete, onView, onStatus }) {
  const statuses = [
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {keyName?.orderBy.firstname} {keyName?.orderBy.lastname}
      </th>
      <td className="px-6 py-4">{keyName?.orderBy.email}</td>

      <td className="px-6 py-4">
        <select
          value={keyName?.status}
          onChange={(e) => onStatus(keyName._id, e.target.value)}
          className="py-2.5 px-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4">{keyName?.date}</td>
      <td className="px-6 py-4">{formatNumber(keyName?.total)}</td>
      <td className="px-6 py-4 text-left">
        <button
          onClick={() => onEdit(keyName?._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(keyName?._id)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
        >
          Delete
        </button>
        <button
          onClick={() => onView(keyName?._id)}
          className="font-medium text-green-600 dark:text-green-500 hover:underline ml-4"
        >
          View
        </button>
      </td>
    </tr>
  );
}
export default TableRow;
