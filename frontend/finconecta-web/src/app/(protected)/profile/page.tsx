"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (
      !session ||
      !session.user ||
      !session.user.roles?.includes("ROLE_ADMIN")
    ) {
      router.replace("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <div className="p-6">Cargando perfil...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de Administrador</h1>
      <div className="space-y-2">
        <p>
          <strong>Usuario:</strong> {session.user.name}
        </p>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
        <p>
          <strong>Roles:</strong> {session.user.roles.join(", ")}
        </p>
      </div>
    </div>
  );
}
