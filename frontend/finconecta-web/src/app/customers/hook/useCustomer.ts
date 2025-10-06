"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/customers", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data: Customer[] = await res.json();
        setCustomers(data);
      } catch (err: any) {
        setError(err.message || "Error fetching customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [session, status]);

  return { customers, loading, error };
}
