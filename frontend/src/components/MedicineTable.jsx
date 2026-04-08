export default function MedicineTable({ medicines, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Manufacturer</th>
            <th>Stock</th>
            <th>Threshold</th>
            <th>Status</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.batchNumber}</td>
              <td>{medicine.manufacturer}</td>
              <td>{medicine.quantityInStock}</td>
              <td>{medicine.minimumThreshold}</td>
              <td>
                <span className={medicine.verificationStatus === 'FAKE' ? 'tag fake' : 'tag verified'}>
                  {medicine.verificationStatus}
                </span>
              </td>
              <td>{medicine.supplier?.name || 'N/A'}</td>
              <td>
                <button onClick={() => onEdit(medicine)}>Edit</button>
                <button className="danger" onClick={() => onDelete(medicine._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
