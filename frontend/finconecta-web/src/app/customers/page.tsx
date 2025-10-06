"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function CustomersPage() {
  const { data: session, status } = useSession();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchCustomers = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/customers", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          if (!res.ok) throw new Error(`Error: ${res.status}`);

          const data = await res.json();
          setCustomers(data);
        } catch (err: any) {
          setError(err.message || "Error fetching customers");
        } finally {
          setLoading(false);
        }
      };

      fetchCustomers();
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading") return <p>Cargando sesión...</p>;
  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de clientes</h1>
      {customers.length === 0 ? (
        <p>No hay clientes disponibles.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {customers.map((c) => (
            <li
              key={c.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <p className="font-semibold text-lg">
                {c.firstName} {c.lastName}
              </p>
              <p className="text-gray-600">{c.email}</p>
              <p className="text-gray-600">{c.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
