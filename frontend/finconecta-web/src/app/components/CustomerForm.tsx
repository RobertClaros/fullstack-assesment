"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "../customers/hook/useCustomer";

interface CustomerFormProps {
  customerToEdit: Customer | null;
  onSave: (customerData: Customer) => Promise<void>;
  isSubmitting: boolean;
}

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function CustomerForm({
  customerToEdit,
  onSave,
  isSubmitting,
}: CustomerFormProps) {
  const [formData, setFormData] = useState(initialFormState);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        firstName: customerToEdit.firstName,
        lastName: customerToEdit.lastName,
        email: customerToEdit.email,
        phone: customerToEdit.phone,
      });
    } else {
      setFormData(initialFormState);
    }
    setValidationError("");
  }, [customerToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      setValidationError("All fields are required.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const customerData: Customer = {
      id: customerToEdit?.id || "",
      ...formData,
    } as Customer;

    await onSave(customerData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {validationError && (
        <p className="text-red-500 text-sm italic">{validationError}</p>
      )}

      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name:
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name:
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone:
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 transition"
          }`}
      >
        {isSubmitting
          ? "Saving..."
          : customerToEdit
          ? "Update Customer"
          : "Create Customer"}
      </button>
    </form>
  );
}
