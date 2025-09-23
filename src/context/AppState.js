import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppStateContext = createContext(null);

const DEFAULT_CARS = [
  { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 45, available: true, seats: 5, transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1549921296-3b4a69a40c58?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, brand: 'Honda', model: 'Civic', pricePerDay: 55, available: true, seats: 5, transmission: 'Manual', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, brand: 'Tesla', model: 'Model 3', pricePerDay: 120, available: false, seats: 5, transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop' },
];

export function AppStateProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const raw = localStorage.getItem('cars');
    return raw ? JSON.parse(raw) : DEFAULT_CARS;
  });
  const [bookings, setBookings] = useState(() => {
    const raw = localStorage.getItem('bookings');
    return raw ? JSON.parse(raw) : [];
  });
  const [counter, setCounter] = useState(() => {
    const raw = localStorage.getItem('counter');
    return raw ? JSON.parse(raw) : 0;
  });
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('items');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
  }, [counter]);
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const actions = useMemo(() => ({
    addCar: (car) => setCars((prev) => [{ ...car, id: Date.now() }, ...prev]),
    updateCar: (id, update) => setCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...update } : c))),
    removeCar: (id) => setCars((prev) => prev.filter((c) => c.id !== id)),

    addBooking: (booking) => setBookings((prev) => [{ id: Date.now(), ...booking }, ...prev]),
    removeBooking: (id) => setBookings((prev) => prev.filter((b) => b.id !== id)),

    increment: (step = 1) => setCounter((v) => v + Number(step)),
    decrement: (step = 1) => setCounter((v) => v - Number(step)),
    resetCounter: () => setCounter(0),

    addItem: (item) => setItems((prev) => [{ id: Date.now(), ...item }, ...prev]),
    removeItem: (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
  }), []);

  const value = useMemo(() => ({ cars, bookings, counter, items, ...actions }), [cars, bookings, counter, items, actions]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}


