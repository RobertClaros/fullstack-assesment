import { Customer } from "../customers/hook/useCustomer";

interface CustomerListProps {
  customers: Customer[];
}

export function CustomerList({ customers }: CustomerListProps) {
  if (customers.length === 0) return <p>No hay clientes disponibles.</p>;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {customers.map((c) => (
        <li
          key={c.id}
          className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
        >
          <p className="font-semibold text-lg">
            {c.firstName} {c.lastName}
          </p>
          <p className="text-gray-600">{c.email}</p>
          <p className="text-gray-600">{c.phone}</p>
        </li>
      ))}
    </ul>
  );
}
