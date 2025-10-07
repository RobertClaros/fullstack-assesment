"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "../customers/hook/useCustomer";
import { useSession } from "next-auth/react";

interface CustomerFormProps {
  customerToEdit: Customer | null;
  onSave: (customerData: Customer) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isSubmitting: boolean;
}

const initialCustomerState: Customer = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function CustomerForm({
  customerToEdit,
  onSave,
  onDelete,
  isSubmitting,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<Customer>(initialCustomerState);
  const { data: session } = useSession();
  const isAdmin = session?.user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (customerToEdit) {
      setFormData(customerToEdit);
    } else {
      setFormData(initialCustomerState);
    }
  }, [customerToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    onSave(formData);
  };

  const handleDeletion = () => {
    if (customerToEdit?.id && isAdmin) {
      onDelete(customerToEdit.id);
    }
  };

  const isEditing = !!customerToEdit?.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["firstName", "lastName", "email", "phone"].map((field) => (
        <div key={field}>
          <label
            htmlFor={field}
            className="block text-sm font-medium text-base-content dark:text-base-content capitalize"
          >
            {field.replace(/([A-Z])/g, " $1").trim()}:
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            id={field}
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
            disabled={isSubmitting || !isAdmin}
            className={`mt-1 block w-full input input-bordered bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${
              !isAdmin ? "cursor-not-allowed" : ""
            }`}
          />
        </div>
      ))}

      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !isAdmin}
          title={
            !isAdmin ? "Solo los administradores pueden guardar cambios" : ""
          }
          className={`w-full py-2 px-4 rounded-lg text-white ${
            !isAdmin
              ? "bg-gray-400 cursor-not-allowed"
              : isSubmitting
              ? "bg-gray-400 cursor-wait"
              : "bg-gray-800 hover:bg-gray-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 transition"
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : isEditing
            ? "Save Changes"
            : "Create Customer"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDeletion}
            disabled={isSubmitting || !isAdmin}
            title={!isAdmin ? "Solo los administradores pueden eliminar" : ""}
            className={`w-full sm:w-auto py-2 px-4 rounded-lg ${
              !isAdmin
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : isSubmitting
                ? "bg-gray-400 cursor-wait text-gray-600"
                : "bg-red-700 hover:bg-red-800 text-white transition"
            }`}
          >
            Delete Customer
          </button>
        )}
      </div>
    </form>
  );
}
