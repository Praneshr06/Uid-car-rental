import React, { useMemo, useState } from 'react';
import { useAppState } from '../context/AppState';

export default function Inventory() {
  const { cars, addCar, updateCar, removeCar } = useAppState();
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [form, setForm] = useState({ brand: '', model: '', pricePerDay: '', seats: '', transmission: 'Automatic', available: true, image: '' });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cars.filter((c) => {
      const matchesQuery = !q || `${c.brand} ${c.model}`.toLowerCase().includes(q);
      const matchesPrice = !maxPrice || c.pricePerDay <= Number(maxPrice);
      return matchesQuery && matchesPrice;
    });
  }, [cars, query, maxPrice]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  function onAdd(e) {
    e.preventDefault();
    const brand = form.brand.trim();
    const model = form.model.trim();
    const img = form.image.trim();
    const seats = Number(form.seats);
    const price = Number(form.pricePerDay);
    if (!brand || !model || !price || price <= 0 || !seats || seats <= 0) return;
    addCar({ brand, model, image: img || undefined, pricePerDay: price, seats, transmission: form.transmission, available: form.available });
    setForm({ brand: '', model: '', pricePerDay: '', seats: '', transmission: 'Automatic', available: true, image: '' });
  }

  return (
    <section className="intro">
      <h2>Inventory</h2>

      <form className="controls" onSubmit={onAdd}>
        <input name="brand" placeholder="Brand" value={form.brand} onChange={onChange} />
        <button type="submit">Add</button>
        <input name="model" placeholder="Model" value={form.model} onChange={onChange} />
      </form>

      <div className="controls controls-rows">
        <input name="pricePerDay" type="number" min="1" placeholder="Price/day" value={form.pricePerDay} onChange={onChange} />
        <select name="transmission" value={form.transmission} onChange={onChange}>
          <option>Automatic</option>
          <option>Manual</option>
        </select>
        <input name="seats" type="number" min="2" placeholder="Seats" value={form.seats} onChange={onChange} />
        <label className="checkbox">
          <input name="available" type="checkbox" checked={form.available} onChange={onChange} /> Available
        </label>
      </div>

      <div className="controls controls-rows">
        <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={onChange} />
        <input type="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <input type="number" min="1" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      <ul className="cars">
        {filtered.map((car) => (
          <li key={car.id} className={`car ${car.available ? 'available' : 'unavailable'}`}>
            <div className="car-image">
              <img src={car.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop'} alt={`${car.brand} ${car.model}`} />
            </div>
            <div className="car-main">
              <h3>{car.brand} {car.model}</h3>
              <p className="muted">{car.transmission} • {car.seats} seats</p>
            </div>
            <div className="car-meta">
              <div className="price">${car.pricePerDay}/day</div>
              <div className={`status ${car.available ? 'ok' : 'bad'}`}>{car.available ? 'Available' : 'Booked'}</div>
              <div className="actions">
                <button onClick={() => updateCar(car.id, { available: !car.available })}>{car.available ? 'Rent' : 'Return'}</button>
                <button className="remove" onClick={() => removeCar(car.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


