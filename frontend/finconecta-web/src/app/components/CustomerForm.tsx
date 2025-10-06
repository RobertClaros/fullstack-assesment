// frontend/finconecta-web/src/app/components/CustomerForm.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Customer } from "../customers/hook/useCustomer"; // Reusa la interfaz

// Define el hook de mutación (lo crearemos en el siguiente paso)
import { useCreateCustomer } from "../customers/hook/useCreateCustomer";

const initialFormState: Omit<Customer, "id"> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function CustomerForm() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState(initialFormState);

  // Usamos el hook que crearemos para manejar el POST
  const { createCustomer, loading, error } = useCreateCustomer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;

    try {
      await createCustomer(formData);
      alert("Customer created successfully!");
      setFormData(initialFormState); // Resetear formulario
      // Opcional: Recargar la lista de clientes
    } catch (err) {
      console.error("Creation Error:", err);
      alert(`Failed to create customer: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
      {/* Input Fields */}
      {Object.keys(initialFormState).map((key) => (
        <div key={key} className="mb-3">
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            {key.replace(/([A-Z])/g, " $1")}:
          </label>
          <input
            type={key === "email" ? "email" : "text"}
            id={key}
            name={key}
            value={formData[key as keyof typeof initialFormState]}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={loading || status !== "authenticated"}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Create Customer"}
      </button>
      {error && <p className="mt-2 text-red-500 text-sm">Error: {error}</p>}
    </form>
  );
}
