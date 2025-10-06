"use client";

import { useCustomers } from "../customers/hook/useCustomer";
import { CustomerList } from "./CustomerList";
import { CustomerForm } from "./CustomerForm";
export function CustomerDashboard() {
  const { customers, loading, error } = useCustomers();

  if (loading) {
    return <div className="p-4 text-center">Loading customers...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <CustomerForm />
      </div>
      <div className="md:col-span-2">
        <CustomerList customers={customers} />
      </div>
    </div>
  );
}
