import { CustomerDashboard } from "../components/CustomerDashboard";

export default function CustomersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Customers Management</h1>
      <CustomerDashboard />
    </div>
  );
}
