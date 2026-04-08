import { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import DashboardCards from './components/DashboardCards';
import MedicineForm from './components/MedicineForm';
import MedicineTable from './components/MedicineTable';
import SupplierPanel from './components/SupplierPanel';
import OrdersList from './components/OrdersList';
import FakeReports from './components/FakeReports';

const navItems = ['Dashboard', 'Inventory', 'Suppliers', 'Orders', 'Fake Reports'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [summary, setSummary] = useState({ totalMedicines: 0, lowStockAlerts: 0, fakeMedicineAlerts: 0 });
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    const [summaryRes, medRes, supRes, ordRes, repRes] = await Promise.all([
      api.get('/dashboard/summary'),
      api.get('/medicines'),
      api.get('/suppliers'),
      api.get('/orders'),
      api.get('/fake-detection/reports')
    ]);

    setSummary(summaryRes.data);
    setMedicines(medRes.data);
    setSuppliers(supRes.data);
    setOrders(ordRes.data);
    setReports(repRes.data);
  };

  useEffect(() => {
    loadData().catch((error) => {
      console.error('Failed to load data', error);
      alert('Unable to connect to backend. Check if server is running.');
    });
  }, []);

  const handleMedicineSubmit = async (payload) => {
    if (selectedMedicine) {
      await api.put(`/medicines/${selectedMedicine._id}`, payload);
      setSelectedMedicine(null);
    } else {
      await api.post('/medicines', payload);
    }

    await loadData();
    setActiveTab('Inventory');
  };

  const handleDeleteMedicine = async (id) => {
    await api.delete(`/medicines/${id}`);
    await loadData();
  };

  const handleCreateSupplier = async (payload) => {
    await api.post('/suppliers', payload);
    await loadData();
  };

  const filteredMedicines = useMemo(() => {
    const key = search.toLowerCase().trim();
    if (!key) return medicines;

    return medicines.filter((item) =>
      [item.name, item.batchNumber, item.manufacturer].some((value) =>
        value?.toLowerCase().includes(key)
      )
    );
  }, [medicines, search]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>DrugFlow</h2>
        {navItems.map((item) => (
          <button
            key={item}
            className={activeTab === item ? 'active' : ''}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="content">
        {activeTab === 'Dashboard' && <DashboardCards summary={summary} />}

        {activeTab === 'Inventory' && (
          <>
            <MedicineForm
              suppliers={suppliers}
              onSubmit={handleMedicineSubmit}
              selectedMedicine={selectedMedicine}
              onCancelEdit={() => setSelectedMedicine(null)}
            />
            <input
              className="search"
              placeholder="Search medicines..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <MedicineTable
              medicines={filteredMedicines}
              onEdit={setSelectedMedicine}
              onDelete={handleDeleteMedicine}
            />
          </>
        )}

        {activeTab === 'Suppliers' && <SupplierPanel suppliers={suppliers} onCreate={handleCreateSupplier} />}
        {activeTab === 'Orders' && <OrdersList orders={orders} />}
        {activeTab === 'Fake Reports' && <FakeReports reports={reports} />}
      </main>
    </div>
  );
}
