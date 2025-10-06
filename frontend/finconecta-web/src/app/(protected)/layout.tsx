"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // Redirige a /auth/signin si no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Cargando sesión...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-base-100 text-base-content">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
