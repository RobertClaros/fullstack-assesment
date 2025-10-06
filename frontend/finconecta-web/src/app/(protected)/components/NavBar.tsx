"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const username = session?.user?.name || "Usuario";
  const roles = session?.user?.roles || [];
  const roleLabel = roles[0] || "User";

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 px-6 py-3 shadow-sm">
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Finconecta
      </div>

      <div className="flex items-center gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar cursor-pointer flex items-center"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
              <Image
                src="/avatardefault_92824.svg"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box shadow-md mt-3 w-56 z-[1] border border-gray-200 dark:border-gray-700"
          >
            <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col">
                <span className="font-semibold">{username}</span>
                <span className="text-xs text-gray-500">{roleLabel}</span>
              </div>
            </li>

            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={16} /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} /> Dark Mode
                  </>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
