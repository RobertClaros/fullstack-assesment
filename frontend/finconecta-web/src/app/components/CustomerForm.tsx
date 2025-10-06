"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "../customers/hook/useCustomer";

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
    onSave(formData);
  };

  const handleDeletion = () => {
    if (customerToEdit?.id) {
      onDelete(customerToEdit.id);
    }
  };

  const isEditing = !!customerToEdit?.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 rounded-md shadow-sm"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-1 block w-full input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 rounded-md shadow-sm"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 rounded-md shadow-sm"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 rounded-md shadow-sm"
          disabled={isSubmitting}
        />
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
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
            disabled={isSubmitting}
            className={`w-full sm:w-auto py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium 
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
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
