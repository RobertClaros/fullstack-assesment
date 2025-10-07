"use client";

import { useState } from "react";
import { useCustomers, Customer } from "../customers/hook/useCustomer";
import CustomerList from "./CustomerList";
import { CustomerForm } from "./CustomerForm";
import { Modal } from "./Modal";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export default function CustomerDashboard() {
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();
  const isAdmin = session?.user?.roles?.includes("ROLE_ADMIN");

  const {
    customers,
    loading,
    error,
    isMutating,
    deleteCustomer,
    saveCustomer,
  } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  if (!resolvedTheme) {
    return (
      <div className="text-center p-8 text-gray-700 dark:text-gray-300">
        Loading theme...
      </div>
    );
  }

  const handleOpenModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleViewOrEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (id: string) => {
    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar este cliente? Esta acción es irreversible."
      )
    ) {
      return;
    }

    try {
      await deleteCustomer(id);
      handleCloseModal();
    } catch (e) {
      console.error("Fallo al eliminar el cliente:", e);
      alert(
        "Error al eliminar el cliente. Revisa la consola para más detalles."
      );
    }
  };

  const handleSaveCustomer = async (customerData: Customer) => {
    setIsFormSubmitting(true);
    try {
      await saveCustomer(customerData);
      handleCloseModal();
    } catch (e) {
      console.error("Fallo al guardar el cliente:", e);
      alert(
        "Error al guardar el cliente. Revisa la consola para más detalles."
      );
    } finally {
      setIsFormSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center p-8 text-gray-700 dark:text-gray-300">
        Cargando clientes...
      </div>
    );
  if (error)
    return (
      <div className="text-center p-8 text-red-500 font-medium">
        Error al cargar: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Customers Management
        </h1>

        {isAdmin ? (
          <button
            className="btn btn-primary bg-gray-800 hover:bg-gray-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white p-2 rounded-lg transition"
            onClick={handleOpenModal}
          >
            Add New Customer
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white p-2 rounded-lg cursor-not-allowed"
            title="Only admins can add customers"
          >
            Add New Customer
          </button>
        )}
      </div>

      <CustomerList
        customers={customers}
        onViewDetails={handleViewOrEditCustomer}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedCustomer ? "Edit Customer Details" : "Add New Customer"}
      >
        <CustomerForm
          customerToEdit={selectedCustomer}
          onSave={handleSaveCustomer}
          onDelete={handleDeleteCustomer}
          isSubmitting={isFormSubmitting || isMutating}
        />
      </Modal>
    </div>
  );
}
