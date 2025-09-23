import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [lastPressed, setLastPressed] = useState('');

  function input(value) {
    setDisplay((prev) => {
      if (prev === '0' && /[0-9.]/.test(value)) return value;
      if (/[+\-×÷%]/.test(value) && /[+\-×÷%]$/.test(prev)) return prev.slice(0, -1) + value;
      if (value === '.' && /(^|[+\-×÷%])\d*$/.test(prev) && prev.split(/[+\-×÷%]/).pop().includes('.')) return prev;
      return prev + value;
    });
    setLastPressed(value);
  }

  function clearAll() {
    setDisplay('0');
    setLastPressed('');
  }

  function backspace() {
    setDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
  }

  function toggleSign() {
    setDisplay((prev) => {
      // apply sign to the last number segment
      const parts = prev.split(/([+\-×÷%])/);
      const last = parts[parts.length - 1];
      if (!last || /[+\-×÷%]/.test(last)) return prev;
      const num = Number(last);
      const flipped = (-num).toString();
      parts[parts.length - 1] = flipped;
      return parts.join('');
    });
  }

  function evaluate() {
    try {
      const sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '*0.01');
      if (/[^0-9+\-*/(). ]/.test(sanitized)) return;
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();
      if (result === Infinity || result === -Infinity) {
        setDisplay('∞');
      } else if (Number.isNaN(result)) {
        setDisplay('0');
      } else {
        setDisplay(String(result));
      }
    } catch {
      setDisplay('0');
    }
  }

  const keys = [
    { label: 'AC', onClick: clearAll, variant: 'gray' },
    { label: '⌫', onClick: backspace, variant: 'gray' },
    { label: '%', onClick: () => input('%'), variant: 'gray' },
    { label: '÷', onClick: () => input('÷'), variant: 'accent' },
    { label: '7', onClick: () => input('7') },
    { label: '8', onClick: () => input('8') },
    { label: '9', onClick: () => input('9') },
    { label: '×', onClick: () => input('×'), variant: 'accent' },
    { label: '4', onClick: () => input('4') },
    { label: '5', onClick: () => input('5') },
    { label: '6', onClick: () => input('6') },
    { label: '-', onClick: () => input('-'), variant: 'accent' },
    { label: '1', onClick: () => input('1') },
    { label: '2', onClick: () => input('2') },
    { label: '3', onClick: () => input('3') },
    { label: '+', onClick: () => input('+'), variant: 'accent' },
    { label: '+/-', onClick: toggleSign },
    { label: '0', onClick: () => input('0') },
    { label: '.', onClick: () => input('.') },
    { label: '=', onClick: evaluate, variant: 'accent' },
  ];

  return (
    <section className="intro">
      <h2>Calculator</h2>
      <div className="calc">
        <div className="calc-display" aria-label="Display">{display}</div>
        <div className="calc-keys">
          {keys.map((k) => (
            <button key={k.label} className={`key ${k.variant || ''}`} onClick={k.onClick}>{k.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}


