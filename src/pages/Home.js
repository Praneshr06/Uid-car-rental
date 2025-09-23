import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="intro" style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: 'white' }}>
        <h2 style={{ marginTop: 0 }}>Hit the road with DriveNow</h2>
        <p style={{ opacity: 0.95 }}>Affordable rentals, premium experience. Choose from sedans, SUVs, and EVs.</p>
        <div className="actions" style={{ marginTop: 12, justifyContent: 'center' }}>
          <Link className="button" to="/inventory" style={{ background: 'white', color: '#1f2937' }}>Explore Inventory</Link>
          <Link className="button" to="/bookings">Make a Booking</Link>
        </div>
      </section>

      <section className="list">
        <h2>Featured</h2>
        <div className="grid-cards">
          <article className="card">
            <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop" alt="Honda Civic" />
            <div className="card-body">
              <h3>Honda Civic</h3>
              <p className="muted">Automatic • 5 seats</p>
            </div>
          </article>
          <article className="card">
            <img src="https://images.unsplash.com/photo-1549921296-3b4a69a40c58?q=80&w=1200&auto=format&fit=crop" alt="Toyota Corolla" />
            <div className="card-body">
              <h3>Toyota Corolla</h3>
              <p className="muted">Automatic • 5 seats</p>
            </div>
          </article>
          <article className="card">
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop" alt="Tesla Model 3" />
            <div className="card-body">
              <h3>Tesla Model 3</h3>
              <p className="muted">EV • Autopilot</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}


