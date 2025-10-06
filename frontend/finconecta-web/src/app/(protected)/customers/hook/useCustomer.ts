"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type CustomerPayload = Omit<Customer, "id"> & { id?: string };

export function useCustomers() {
  const { data: session, status } = useSession();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const [refreshToggle, setRefreshToggle] = useState(0);

  const refetchCustomers = useCallback(() => {
    setRefreshToggle((prev) => prev + 1);
  }, []);

  const executeApiCall = useCallback(
    async (
      url: string,
      method: "DELETE" | "POST" | "PUT",
      body?: CustomerPayload
    ) => {
      if (status !== "authenticated" || !API_BASE_URL) {
        throw new Error(
          "El usuario no está autenticado o API_BASE_URL no está configurado."
        );
      }

      setIsMutating(true);
      setError("");

      try {
        const fullUrl = url
          ? `${API_BASE_URL}/customers/${url}`
          : `${API_BASE_URL}/customers`;

        const res = await fetch(fullUrl, {
          method: method,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error en la operación (${method}): ${res.status} - ${errorText}`
          );
        }

        if (method === "DELETE") return;
        return (await res.json()) as Customer;
      } catch (err: any) {
        setError(err.message || `Error al ejecutar la operación ${method}.`);
        throw err;
      } finally {
        setIsMutating(false);
      }
    },
    [session, status]
  );

  const deleteCustomer = useCallback(
    async (id: string) => {
      try {
        await executeApiCall(id, "DELETE");
        refetchCustomers();
      } catch (err) {
        throw err;
      }
    },
    [executeApiCall, refetchCustomers]
  );

  const saveCustomer = useCallback(
    async (customerData: CustomerPayload): Promise<Customer | undefined> => {
      try {
        const isUpdate = !!customerData.id;
        const url = isUpdate ? customerData.id! : "";
        const method = isUpdate ? "PUT" : "POST";

        const result = await executeApiCall(url, method, customerData);

        refetchCustomers();
        return result;
      } catch (err) {
        throw err;
      }
    },
    [executeApiCall, refetchCustomers]
  );

  useEffect(() => {
    if (status !== "authenticated" || !API_BASE_URL) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const fetchCustomers = async () => {
      try {
        const fullUrl = `${API_BASE_URL}/customers`;

        const res = await fetch(fullUrl, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`Error al cargar: ${res.status}`);

        const data: Customer[] = await res.json();
        setCustomers(data);
      } catch (err: any) {
        const errorMessage = API_BASE_URL
          ? err.message || "Error al obtener clientes"
          : "API_BASE_URL no configurado. Revisa tu .env.local.";

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [session, status, refreshToggle]);

  return {
    customers,
    loading,
    error,
    isMutating,
    refetchCustomers,
    deleteCustomer,
    saveCustomer,
  };
}
