//import React from 'react';
import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { createPortal } from 'react-dom';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <button onClick={() => setCounter(counter + 1)}>{counter}</button>
  );
}

export default App;
