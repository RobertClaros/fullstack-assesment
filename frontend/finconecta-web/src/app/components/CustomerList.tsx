"use client";

import React from "react";
import { Customer } from "../customers/hook/useCustomer";

interface CustomerListProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
}

export default function CustomerList({
  customers,
  onViewDetails,
}: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 shadow rounded-lg mt-4">
        <p className="text-gray-500 dark:text-gray-400">No customers found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg mt-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Phone
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-800/50 transition duration-150 cursor-pointer"
              onClick={() => onViewDetails(customer)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {customer.firstName} {customer.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {customer.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {customer.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
