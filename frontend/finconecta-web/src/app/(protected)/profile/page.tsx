"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-400">
        You must be logged in to view this page.
      </div>
    );
  }

  const isAdmin = session.user?.roles?.includes("ROLE_ADMIN");

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-400">
        You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Admin Profile
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p>
          <strong>Username:</strong> {session.user.name}
        </p>
        <p>
          <strong>User ID:</strong> {session.user.id}
        </p>
        <p>
          <strong>Roles:</strong> {session.user.roles?.join(", ")}
        </p>
      </div>
    </div>
  );
}
