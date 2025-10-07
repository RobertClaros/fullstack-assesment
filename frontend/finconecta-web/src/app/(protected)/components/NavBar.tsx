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
    <nav className="flex items-center justify-between bg-base-100 border-b border-base-300 px-6 py-3 shadow-sm">
      <div className="text-lg font-semibold text-base-content">Finconecta</div>

      <div className="flex items-center gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar cursor-pointer flex items-center"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
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
            className="menu dropdown-content bg-base-100 rounded-box shadow-md mt-3 w-56 z-[1] border border-base-300"
          >
            <li className="px-4 py-2 text-sm text-base-content border-b border-base-300">
              <div className="flex flex-col">
                <span className="font-semibold">{username}</span>
                <span className="text-xs text-gray-500">{roleLabel}</span>
              </div>
            </li>

            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-base-content hover:text-primary"
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
                className="text-error hover:text-error-focus"
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
