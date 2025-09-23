import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

export default function Items() {
  const { items, addItem, removeItem } = useAppState();
  const [form, setForm] = useState({ name: '', description: '', quantity: '' });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const description = form.description.trim();
    const quantity = Number(form.quantity);
    if (!name || !description || !quantity || quantity <= 0) return;
    addItem({ name, description, quantity });
    setForm({ name: '', description: '', quantity: '' });
  }

  return (
    <section className="intro">
      <h2>Add Item</h2>
      <form className="item-form" onSubmit={onSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input name="name" placeholder="Item name" value={form.name} onChange={onChange} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea name="description" placeholder="Short description" value={form.description} onChange={onChange} />
        </div>
        <div className="form-row">
          <label>Quantity</label>
          <input name="quantity" type="number" min="1" placeholder="e.g., 10" value={form.quantity} onChange={onChange} />
        </div>
        <div className="actions" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </form>

      <h3 style={{ marginTop: 16 }}>Items</h3>
      {items.length === 0 ? (
        <p className="empty">No items yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td className="muted">{it.description}</td>
                <td><strong>{it.quantity}</strong></td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-danger" onClick={() => removeItem(it.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}


