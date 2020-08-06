//import React from 'react';
import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { createPortal } from 'react-dom';



const City = props => (
  <button style={{ backgroundColor: colors[props.status(props.cityName)] }}
    onClick={() => props.onClick(props.cityName)}
  >
    {props.cityName}
  </button>
);


const NextQuestion = (props) => (
  <button style={{ backgroundColor: colors['gameoverornextquestion'] }} onClick={() => props.onClick()}>
    Next Question
  </button>
);


const PlayAgain = (props) => (
  <button style={{ backgroundColor: colors['gameoverornextquestion'] }} onClick={props.onClick}>Play Again</button>
);




const WeatherGame = (props) => {

  const [selectedCity, setSelectedCity] = useState("");
  const [numberAnswered, setNumberAnswered] = useState(0);
  const [numberCorrectAnswered, setNumberCorrectAnswered] = useState(0);
  const [randomCities, setRandomCities] = useState(utils.loadRandomCities());
  const [citiesInPlay, setCitiesInPlay] = useState(utils.getFirstTwoCitiesFromRandomCities(randomCities));


  const gameStatus = numberAnswered === 5
    ? 'over'
    : 'active'

  const correctOrIncorrectMessage = (selectedCity) => {
    if (selectedCity == utils.getCityWithHighestRainfall(citiesInPlay)) {
      return 'You are correct!';
    }
    else {
      return 'Sorry, that is NOT correct!';
    }

  }



  const cityStatus = (cityName) => {
    if (selectedCity == cityName) {
      if (selectedCity == utils.getCityWithHighestRainfall(citiesInPlay)) {
        return 'correct';
      }
      else {
        return 'wrong';
      }
    }
    return 'available';
  }

  const onCityClick = (city) => {
    if (selectedCity) {
      return;
    }
    setSelectedCity(city);
    setNumberAnswered(numberAnswered + 1);
    if (city == utils.getCityWithHighestRainfall(citiesInPlay)) {

      setNumberCorrectAnswered(numberCorrectAnswered + 1);
    }


  }

  const onNextQuestionClick = () => {

    setSelectedCity("");

    setRandomCities(utils.removeFirstTwoCitiesFromRandomCities(randomCities));

    setCitiesInPlay(utils.getFirstTwoCitiesFromRandomCities(randomCities));

  }



  return (
    <div>



      <div className="right">


        {utils.displayCitiesInPlay(citiesInPlay).map(cityNameFromCitiesInPlay =>
          <City cityName={cityNameFromCitiesInPlay} status={cityStatus} onClick={onCityClick} />
        )
        }
      </div>



      <div>
        {selectedCity ?
          <div>
            <p>{correctOrIncorrectMessage(selectedCity)}</p>
            {utils.displayCitiesInPlay(citiesInPlay).map(cityNameFromCitiesInPlay =>
              <p>{cityNameFromCitiesInPlay} has {citiesInPlay[cityNameFromCitiesInPlay]} inches of rain annually.</p>
            )
            }

            {(gameStatus == 'active') ?
              <div>
                <p>questions answered: {numberAnswered}</p><p>correct answers: {numberCorrectAnswered}</p>
                <p><NextQuestion onClick={onNextQuestionClick} /></p>
              </div> : <b></b>
            }

          </div> : <p></p>}
      </div>
      {gameStatus !== 'active' ?
        <div><p style={{ backgroundColor: colors['gameoverornextquestion'] }}>GAME OVER!</p> <p> Final Score </p>
          <p>Correct answers: {numberCorrectAnswered}</p>
          <p>Total questions: {numberAnswered}</p>
          <p>Percentage Correct: {utils.percentage(numberCorrectAnswered, numberAnswered)}%</p>
          <p><PlayAgain onClick={props.startNewGame} /></p></div> : <b></b>
      }</div>

  );
}







function App() {
  const [weatherGameID, setWeatherGameID] = useState(1);

  return (
    <WeatherGame key={weatherGameID} startNewGame={() => setWeatherGameID(weatherGameID + 1)} />
  );
}


// Color Theme
const colors = {
  available: 'lightgray',
  gameoverornextquestion: 'lightgreen',
  wrong: 'lightcoral',
  correct: 'deepskyblue',
};

// Math science
const utils = {


  getFirstTwoCitiesFromRandomCities: (randomCities) => {
    const randomCityKeyArray = Object.keys(randomCities);
    const firstTwoCitiesFromRandomCityDictionary = { [randomCityKeyArray[0]]: randomCities[randomCityKeyArray[0]], [randomCityKeyArray[1]]: randomCities[randomCityKeyArray[1]] };
    return firstTwoCitiesFromRandomCityDictionary;
  },



  removeFirstTwoCitiesFromRandomCities: (randomCities) => {
    const randomCityKeyArray = Object.keys(randomCities);
    delete randomCities[randomCityKeyArray[0]];
    delete randomCities[randomCityKeyArray[1]];
    return randomCities;
  },


  displayCitiesInPlay: (citiesInPlay) => {
    const citiesInPlayKeyArray = Object.keys(citiesInPlay);
    return citiesInPlayKeyArray;
  },



  getCityWithHighestRainfall: (citiesInPlay) => {
    const citiesInPlayKeyArray = Object.keys(citiesInPlay);
    if (citiesInPlay[citiesInPlayKeyArray[0]] > citiesInPlay[citiesInPlayKeyArray[1]]) {
      return citiesInPlayKeyArray[0];
    }
    return citiesInPlayKeyArray[1];
  },


  percentage: (top, bottom) => Math.floor((top / bottom) * 100),



  loadRandomCities: () => {
    const allPossibleCities = {
      "Atlanta, Georgia": 49.7,
      "Austin, Texas": 34.2,
      "Baltimore, Maryland": 41.9,
      "Birmingham, Alabama": 53.7,
      "Boston, Massachusetts": 43.8,
      "Buffalo, New York": 40.5,
      "Charlotte, North Carolina": 41.6,
      "Chicago, Illinois": 36.9,
      "Cincinnati, Ohio": 41.9,
      "Cleveland, Ohio": 39.1,
      "Columbus, Ohio": 39.3,
      "Dallas, Texas": 37.6,
      "Denver, Colorado": 15.6,
      "Detroit, Michigan": 33.5,
      "Hartford, Connecticut": 45.9,
      "Houston, Texas": 49.8,
      "Indianapolis, Indiana": 42.4,
      "Jacksonville, Florida": 52.4,
      "Kansas City, Missouri": 39.1,
      "Las Vegas, Nevada": 4.2,
      "Los Angeles, California": 12.8,
      "Louisville, Kentucky": 44.9,
      "Memphis, Tennessee": 53.7,
      "Miami, Florida": 61.9,
      "Milwaukee, Wisconsin": 34.8,
      "Minneapolis, Minnesota": 30.6,
      "Nashville, Tennessee": 47.3,
      "New Orleans, Louisiana": 62.7,
      "New York, New York": 49.9,
      "Oklahoma City, Oklahoma": 36.5,
      "Orlando, Florida": 50.7,
      "Philadelphia, Pennsylvania": 41.5,
      "Phoenix, Arizona": 8.2,
      "Pittsburgh, Pennsylvania": 38.2,
      "Portland, Oregon": 43.5,
      "Providence, Rhode Island": 47.2,
      "Raleigh, North Carolina": 46,
      "Richmond, Virginia": 43.6,
      "Riverside, California": 10.3,
      "Rochester, New York": 34.3,
      "Sacramento, California": 18.5,
      "Salt Lake City, Utah": 16.1,
      "San Antonio, Texas": 32.3,
      "San Diego, California": 10.3,
      "San Francisco, California": 20.7,
      "San Jose, California": 15.8,
      "Seattle, Washington": 37.7,
      "St. Louis, Missouri": 41,
      "Tampa, Florida": 46.3,
      "Virginia Beach, Virginia": 46.5,
      "Washington, DC": 39.7,
    };

    const allPossibleCitiesKeys = Object.keys(allPossibleCities);

    var arrayOfUniqueRandomNumbers = [];
    var selectedRandomCitiesForGame = {};
    while (arrayOfUniqueRandomNumbers.length < 10) {
      var randomNumber = Math.floor(Math.random() * 51);
      if (arrayOfUniqueRandomNumbers.indexOf(randomNumber) === -1) {
        arrayOfUniqueRandomNumbers.push(randomNumber);
        selectedRandomCitiesForGame[allPossibleCitiesKeys[randomNumber]] = allPossibleCities[allPossibleCitiesKeys[randomNumber]];
      }
    }
    return selectedRandomCitiesForGame;
  },

};



export default App;
