"use client";

import { useState } from "react";
import { useCustomers, Customer } from "../customers/hook/useCustomer";
import CustomerList from "./CustomerList";
import { CustomerForm } from "./CustomerForm";
import { Modal } from "./Modal";

export default function CustomerDashboard() {
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
  const handleOpenModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (id: string) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este cliente?")
    ) {
      return;
    }

    try {
      await deleteCustomer(id);
      console.log(`Cliente con ID ${id} eliminado exitosamente.`);
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
      alert(`Error al guardar el cliente.`);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center p-8">Cargando clientes...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500 font-medium">
        Error al cargar: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Customers Management
        </h1>
        <button
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition"
          onClick={handleOpenModal}
        >
          Add New Customer
        </button>
      </div>

      <CustomerList
        customers={customers}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedCustomer ? "Edit Customer" : "Add New Customer"}
      >
        <CustomerForm
          customerToEdit={selectedCustomer}
          onSave={handleSaveCustomer}
          isSubmitting={isFormSubmitting || isMutating}
        />
      </Modal>
    </div>
  );
}
