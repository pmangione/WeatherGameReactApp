import React from 'react';
//import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


const City = props => (
  <button style={{ backgroundColor: colors[props.status(props.cityName)] }}
    onClick={() => props.onClick(props.cityName)}
  >
    {props.cityName}
  </button>
);


const WeatherGame = () => {


  const [selectedCity, setSelectedCity] = useState("");
  const [correctCity, setCorrectCity] = useState(utils.getbiggestcity());



  const cityStatus = (cityName) => {
    if (selectedCity == cityName) {
      if (selectedCity == correctCity) {
        return 'candidate'
      }
      else {
        return 'wrong'
      }
    }
    return 'available'
  }


  const onNumberClick = (city) => {
    if (selectedCity) {
      return;
    }
    setSelectedCity(city);
  }


  return (
    <div className="right">

      {utils.getCitiesFromCityRainfallDict().map(item =>
        <City cityName={item} status={cityStatus} onClick={onNumberClick} />
      )
      }

    </div>
  );
}





// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {

  getCityRainfallDict: () => {
    const cityRainfallDict = { "Boise": 20, "Denver": 17 };
    return cityRainfallDict;
  },


  //Make Dictionary of Cities with Rainfall
  getCitiesFromCityRainfallDict: () => {
    const cityRainfallDict = utils.getCityRainfallDict();
    const rainDictKeys = Object.keys(cityRainfallDict);
    return rainDictKeys;
  },


  //Make Dictionary of Cities with Rainfall and Take Biggest City
  getbiggestcity: () => {
    const rainDict = utils.getCityRainfallDict();
    const rainDictKeys = utils.getCitiesFromCityRainfallDict();
    if (rainDict[rainDictKeys[0]] > rainDict[rainDictKeys[1]]) {
      return rainDictKeys[0];
    }
    return rainDictKeys[1];
  },


  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};






export default WeatherGame;



