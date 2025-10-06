"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function useCustomers() {
  const { data: session, status } = useSession();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "authenticated" || !API_BASE_URL) {
      setLoading(false);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const fullUrl = `${API_BASE_URL}/customers`;

        const res = await fetch(fullUrl, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data: Customer[] = await res.json();
        setCustomers(data);
      } catch (err: any) {
        const errorMessage = API_BASE_URL
          ? err.message || "Error fetching customers"
          : "API_BASE_URL not configured. Check your .env.local file.";

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [session, status]);

  return { customers, loading, error };
}
