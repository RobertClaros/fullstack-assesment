import { useState } from "react";
import { useSession } from "next-auth/react";
import { Customer } from "./useCustomer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useCreateCustomer() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = async (newCustomerData: Omit<Customer, "id">) => {
    if (!API_BASE_URL) {
      setError("API_BASE_URL not configured.");
      return;
    }
    if (!session?.accessToken) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fullUrl = `${API_BASE_URL}/customers`;

      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(newCustomerData),
      });

      if (res.status === 403) {
        throw new Error(
          "Authorization denied. You may not have the ADMIN role."
        );
      }
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || `Error: ${res.status}`);
      }

      const createdCustomer: Customer = await res.json();
      setLoading(false);
      return createdCustomer;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { createCustomer, loading, error };
}
