"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, HelpCircle, UserCog, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin = session?.user?.roles?.includes("ROLE_ADMIN");

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/" },
    { name: "Customers", icon: Users, href: "/customers" },
    ...(isAdmin
      ? [
          { name: "Profile", icon: UserCog, href: "/profile" },
          { name: "Logs", icon: LogOut, href: "/logs" },
        ]
      : []),
    { name: "Support", icon: HelpCircle, href: "/support" },
  ];

  return (
    <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col">
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center bg-base-200 rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-full outline-none text-sm text-base-content"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {menuItems.map(({ name, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <li key={name}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
