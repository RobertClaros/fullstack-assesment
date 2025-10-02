import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-base-200 p-6 space-y-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <Link href="/customers" className="hover:text-primary font-semibold">
          Customers
        </Link>
        <Link href="/logs" className="hover:text-primary">
          Logs
        </Link>
        <Link href="/settings" className="hover:text-primary">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
