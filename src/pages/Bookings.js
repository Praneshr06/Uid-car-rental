import React, { useMemo, useState } from 'react';
import { useAppState } from '../context/AppState';

export default function Bookings() {
  const { cars, bookings, addBooking, removeBooking } = useAppState();
  const [dailyRate, setDailyRate] = useState('');
  const [days, setDays] = useState('');
  const [taxRate, setTaxRate] = useState('18');
  const [discount, setDiscount] = useState('0');
  const [selectedCarId, setSelectedCarId] = useState('');

  const totals = useMemo(() => {
    const rate = Number(dailyRate) || 0;
    const numDays = Number(days) || 0;
    const subtotal = rate * numDays;
    const discountAmt = (Number(discount) || 0) / 100 * subtotal;
    const taxable = Math.max(0, subtotal - discountAmt);
    const taxAmt = (Number(taxRate) || 0) / 100 * taxable;
    const total = taxable + taxAmt;
    return { subtotal, discountAmt, taxAmt, total };
  }, [dailyRate, days, taxRate, discount]);

  function createBooking() {
    const car = cars.find((c) => String(c.id) === String(selectedCarId));
    if (!car) return;
    const rate = Number(dailyRate) || car.pricePerDay;
    const numDays = Number(days) || 1;
    addBooking({ carId: car.id, carLabel: `${car.brand} ${car.model}`, pricePerDay: rate, days: numDays, total: Number(totals.total.toFixed(2)), createdAt: new Date().toISOString() });
  }

  return (
    <section className="intro">
      <h2>Bookings</h2>
      <p>Create and view bookings. The total updates automatically.</p>

      <div className="controls controls-rows">
        <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} aria-label="Select car">
          <option value="">Select a car...</option>
          {cars.map((c) => (
            <option key={c.id} value={c.id}>{c.brand} {c.model} (${c.pricePerDay}/day)</option>
          ))}
        </select>
        <input type="number" min="0" placeholder="Daily rate ($)" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} aria-label="Daily rate" />
        <input type="number" min="1" placeholder="Days" value={days} onChange={(e) => setDays(e.target.value)} aria-label="Days" />
        <input type="number" min="0" max="100" placeholder="Tax %" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} aria-label="Tax rate" />
        <input type="number" min="0" max="100" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} aria-label="Discount" />
      </div>

      <ul className="items">
        <li className="item"><span>Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></li>
        <li className="item"><span>Discount</span><strong>-${totals.discountAmt.toFixed(2)}</strong></li>
        <li className="item"><span>Tax</span><strong>${totals.taxAmt.toFixed(2)}</strong></li>
        <li className="item"><span>Total</span><strong>${totals.total.toFixed(2)}</strong></li>
      </ul>

      <div className="actions" style={{ marginTop: 12 }}>
        <button onClick={createBooking}>Create Booking</button>
      </div>

      <h3 style={{ marginTop: 16 }}>Existing Bookings</h3>
      {bookings.length === 0 ? (
        <p className="empty">No bookings yet.</p>
      ) : (
        <ul className="cars">
          {bookings.map((b) => (
            <li key={b.id} className="car">
              <div className="car-main">
                <h3>{b.carLabel}</h3>
                <p className="muted">{b.days} day(s) • ${b.pricePerDay}/day</p>
              </div>
              <div className="car-meta">
                <div className="price">Total ${b.total.toFixed(2)}</div>
                <div className="actions">
                  <button className="remove" onClick={() => removeBooking(b.id)}>Cancel</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


