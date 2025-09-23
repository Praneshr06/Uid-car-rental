import './App.css';
import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import UserProfilePage from './pages/UserProfilePage';
import Calculator from './pages/Calculator';
import Inventory from './pages/Inventory';
import { AppStateProvider } from './context/AppState';
import Counter from './pages/Counter';
import { useAppState } from './context/AppState';
import Items from './pages/Items';

function CounterBadge() {
  const { counter } = useAppState();
  return <span className="badge nav-badge">{counter}</span>;
}

function App() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <Router>
      <AppStateProvider>
      <div className="App">
        <header className="header">
          <h1>DriveNow Car Rental</h1>
          <p className="subtitle">{greeting}! Navigate the app using the links below.</p>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : undefined}>Services</NavLink>
            <NavLink to="/inventory" className={({ isActive }) => isActive ? 'active' : undefined}>Inventory</NavLink>
            <NavLink to="/bookings" className={({ isActive }) => isActive ? 'active' : undefined}>Bookings</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : undefined}>User Profile</NavLink>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? 'active' : undefined}>Calculator</NavLink>
            <NavLink to="/items" className={({ isActive }) => isActive ? 'active' : undefined}>Items</NavLink>
            <NavLink to="/counter" className={({ isActive }) => isActive ? 'active' : undefined}>Counter <CounterBadge /></NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/items" element={<Items />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </main>

        <footer className="footer">
          <small>© {new Date().getFullYear()} DriveNow Rentals</small>
        </footer>
      </div>
      </AppStateProvider>
    </Router>
  );
}

export default App;
