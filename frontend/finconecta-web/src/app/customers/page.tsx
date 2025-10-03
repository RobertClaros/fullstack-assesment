"use client";

import { useSession } from "next-auth/react";

export default function CustomersPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>loading...</p>;
  if (!session) return <p>No session.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        ¡Bienvenido, {session.user?.name}!
      </h1>
      <p>
        Esta es tu página de prueba en <strong>/customers</strong>.
      </p>
    </div>
  );
}
