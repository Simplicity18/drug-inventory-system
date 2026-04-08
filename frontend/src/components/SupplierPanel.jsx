import { useState } from 'react';

const initialSupplier = {
  name: '',
  contactPerson: '',
  email: '',
  phone: '',
  address: ''
};

export default function SupplierPanel({ suppliers, onCreate }) {
  const [form, setForm] = useState(initialSupplier);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(form);
    setForm(initialSupplier);
  };

  return (
    <section>
      <h3>Suppliers</h3>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input name="name" placeholder="Supplier Name" value={form.name} onChange={handleChange} required />
        <input
          name="contactPerson"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={handleChange}
          required
        />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Add Supplier</button>
      </form>

      <ul className="supplier-list">
        {suppliers.map((supplier) => (
          <li key={supplier._id}>
            <strong>{supplier.name}</strong> — {supplier.contactPerson} ({supplier.phone})
          </li>
        ))}
      </ul>
    </section>
  );
}
