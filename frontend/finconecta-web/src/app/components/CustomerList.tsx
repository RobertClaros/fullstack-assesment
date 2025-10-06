"use client";

import React from "react";
import { Customer } from "../customers/hook/useCustomer";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function CustomerList({
  customers,
  onEdit,
  onDelete,
}: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center p-8 bg-white shadow rounded-lg mt-4">
        <p className="text-gray-500">No customers found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-lg mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {customer.firstName} {customer.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {customer.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {customer.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(customer)}
                  className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md p-1.5 transition duration-150 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-md p-1.5 transition duration-150 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
