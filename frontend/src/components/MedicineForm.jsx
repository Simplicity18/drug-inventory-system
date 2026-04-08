import { useEffect, useState } from 'react';

const initialForm = {
  name: '',
  batchNumber: '',
  manufacturer: '',
  expiryDate: '',
  quantityInStock: 0,
  minimumThreshold: 10,
  price: 0,
  supplier: '',
  wholesalerInfo: ''
};

export default function MedicineForm({ suppliers, onSubmit, selectedMedicine, onCancelEdit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selectedMedicine) {
      setForm({
        ...selectedMedicine,
        expiryDate: selectedMedicine.expiryDate?.slice(0, 10),
        supplier: selectedMedicine.supplier?._id || selectedMedicine.supplier
      });
    } else {
      setForm(initialForm);
    }
  }, [selectedMedicine]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      quantityInStock: Number(form.quantityInStock),
      minimumThreshold: Number(form.minimumThreshold),
      price: Number(form.price)
    });
    if (!selectedMedicine) {
      setForm(initialForm);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <h3>{selectedMedicine ? 'Update Medicine' : 'Add Medicine'}</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input
        name="batchNumber"
        placeholder="Batch Number"
        value={form.batchNumber}
        onChange={handleChange}
        required
      />
      <input
        name="manufacturer"
        placeholder="Manufacturer"
        value={form.manufacturer}
        onChange={handleChange}
        required
      />
      <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
      <input
        name="quantityInStock"
        type="number"
        value={form.quantityInStock}
        onChange={handleChange}
        required
      />
      <input
        name="minimumThreshold"
        type="number"
        value={form.minimumThreshold}
        onChange={handleChange}
        required
      />
      <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
      <select name="supplier" value={form.supplier} onChange={handleChange} required>
        <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier._id}>
            {supplier.name}
          </option>
        ))}
      </select>
      <input
        name="wholesalerInfo"
        placeholder="Wholesaler info"
        value={form.wholesalerInfo}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit">{selectedMedicine ? 'Save Changes' : 'Add Medicine'}</button>
        {selectedMedicine && (
          <button type="button" className="secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
