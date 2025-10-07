"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface LogEntry {
  id: string;
  username: string;
  action: string;
  details: string;
  timestamp: string;
}

export default function LogsPage() {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const isLoading = status === "loading";

  useEffect(() => {
    if (session?.user?.roles?.includes("ROLE_ADMIN")) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logs?size=50`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
        .then((res) => res.json())
        .then(setLogs)
        .catch(console.error);
    }
  }, [session]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!session) return <div className="p-8 text-center">Login required</div>;

  const isAdmin = session.user?.roles?.includes("ROLE_ADMIN");
  if (!isAdmin) return <div className="p-8 text-center">Access denied</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        System Logs
      </h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {log.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {log.action}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {log.details}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {/* Formatear timestamp para mayor legibilidad */}
                  {new Date(log.timestamp).toLocaleString("es-BO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
