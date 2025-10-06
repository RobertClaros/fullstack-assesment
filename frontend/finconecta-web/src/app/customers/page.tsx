"use client";

import { useCustomers } from "./hook/useCustomer";
import { CustomerList } from "../components/CustomerList";

export default function CustomersPage() {
  const { customers, loading, error } = useCustomers();

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de clientes</h1>
      <CustomerList customers={customers} />
    </div>
  );
}
