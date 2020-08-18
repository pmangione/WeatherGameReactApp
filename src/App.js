//import React from 'react';
import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { createPortal } from 'react-dom';
import Colors from './Colors';

import City from './Components/City'
import NextQuestion from './Components/NextQuestion'
import PlayAgain from './Components/PlayAgain'
import WeatherGame from './Components/WeatherGame'

import cityFileNames from './cityFileNames'
import utils from './utils.js'



function App() {
  const [weatherGameID, setWeatherGameID] = useState(1);

  return (
    <WeatherGame key={weatherGameID} startNewGame={() => setWeatherGameID(weatherGameID + 1)} />
  );
}



export default App;