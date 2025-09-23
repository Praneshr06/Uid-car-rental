import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

export default function Counter() {
  const { counter, increment, decrement, resetCounter } = useAppState();
  const [step, setStep] = useState(1);

  return (
    <section className="intro counter-card">
      <h2 style={{ textAlign: 'center' }}>Counter</h2>
      <div className="counter-wrapper">
        <div className="counter-display" aria-label="Count">{counter}</div>

        <div className="btn-row">
          <button className="btn btn-ghost" onClick={() => decrement(step)}>- {step}</button>
          <button className="btn btn-primary" onClick={() => increment(step)}>+ {step}</button>
        </div>

        <div className="btn-row">
          <button className="btn btn-danger" onClick={resetCounter}>Reset</button>
        </div>

        <div className="step-group">
          <div className="step-label">Step</div>
          <div className="btn-group">
            <button className={`btn btn-pill ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1</button>
            <button className={`btn btn-pill ${step === 5 ? 'active' : ''}`} onClick={() => setStep(5)}>5</button>
            <button className={`btn btn-pill ${step === 10 ? 'active' : ''}`} onClick={() => setStep(10)}>10</button>
          </div>
          <div className="step-adjust">
            <button className="btn btn-ghost" onClick={() => setStep((s) => Math.max(1, Number(s) - 1))}>-</button>
            <input
              className="step-input"
              type="number"
              min="1"
              value={step}
              onChange={(e) => setStep(Math.max(1, Number(e.target.value || 1)))}
              aria-label="Step"
            />
            <button className="btn btn-ghost" onClick={() => setStep((s) => Math.max(1, Number(s) + 1))}>+</button>
          </div>
        </div>
      </div>
    </section>
  );
}


