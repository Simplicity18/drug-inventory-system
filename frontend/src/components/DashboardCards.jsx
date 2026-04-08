export default function DashboardCards({ summary }) {
  const cards = [
    { label: 'Total Medicines', value: summary.totalMedicines },
    { label: 'Low Stock Alerts', value: summary.lowStockAlerts },
    { label: 'Fake Alerts', value: summary.fakeMedicineAlerts }
  ];

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <div key={card.label} className="card">
          <p className="card-label">{card.label}</p>
          <h3>{card.value}</h3>
        </div>
      ))}
    </div>
  );
}
