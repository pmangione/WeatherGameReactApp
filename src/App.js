//import React from 'react';
import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { createPortal } from 'react-dom';


import Atlanta from './Images/Atlanta.jpg'
import Austin from './Images/Austin.jpg'
import Baltimore from './Images/Baltimore.jpg'
import Birmingham from './Images/Birmingham.jpg'
import Boston from './Images/Boston.jpg'
import Buffalo from './Images/Buffalo.jpg'
import Denver from './Images/Denver.jpg'

import Charlotte from './Images/Charlotte.jpg'

import Chicago from './Images/Chicago.jpg'
import Cincinnati from './Images/Cincinnati.jpg'


import Cleveland from './Images/Cleveland.jpg'
import Columbus from './Images/Columbus.jpg'
import Dallas from './Images/Dallas.jpg'
import Detroit from './Images/Detroit.jpg'
import Hartford from './Images/Hartford.jpg'
import Houston from './Images/Houston.jpg'
import Indianapolis from './Images/Indianapolis.jpg'


import Jacksonville from './Images/Jacksonville.jpg'
import KansasCity from './Images/KansasCity.jpg'
import LasVegas from './Images/LasVegas.jpg'
import LosAngeles from './Images/LosAngeles.jpg'
import Louisville from './Images/Louisville.jpg'
import Memphis from './Images/Memphis.jpg'
import Miami from './Images/Miami.jpg'
import Milwaukee from './Images/Milwaukee.jpg'


import Minneapolis from './Images/Minneapolis.jpg'
import Nashville from './Images/Nashville.jpg'
import NewOrleans from './Images/NewOrleans.jpg'
import NewYorkCity from './Images/NewYorkCity.jpg'
import OklahomaCity from './Images/OklahomaCity.jpg'
import Orlando from './Images/Orlando.jpg'
import Philadelphia from './Images/Philadelphia.jpg'
import Phoenix from './Images/Phoenix.jpg'


import Pittsburgh from './Images/Pittsburgh.jpg'
import Portland from './Images/Portland.jpg'
import Providence from './Images/Providence.jpg'
import Raleigh from './Images/Raleigh.jpg'
import Richmond from './Images/Richmond.jpg'
import Riverside from './Images/Riverside.jpg'
import Rochester from './Images/Rochester.jpg'
import Sacramento from './Images/Sacramento.jpg'


import SaltLakeCity from './Images/SaltLakeCity.jpg'
import SanAntonio from './Images/SanAntonio.jpg'
import SanDiego from './Images/SanDiego.jpg'
import SanFrancisco from './Images/SanFrancisco.jpg'
import SanJose from './Images/SanJose.jpg'
import Seattle from './Images/Seattle.jpg'
import StLouis from './Images/StLouis.jpg'
import Tampa from './Images/Tampa.jpg'

import VirginiaBeach from './Images/VirginiaBeach.jpg'
import WashingtonDC from './Images/WashingtonDC.jpg'





const City = props => (
  <button style={{ backgroundColor: colors[props.status(props.cityName)], width: "100" }}
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


    <React.Fragment>


      {/*<div class="div">
        <p>On average, which city has more precipitation per year?</p>

      </div>
  */}

      <table class="table">
        On average, which city has more precipitation per year?

      </table>


      <table class="table">


        {utils.displayCitiesInPlay(citiesInPlay).map(cityNameFromCitiesInPlay =>
          <td>


            <tr>
              <img src={cityFileNames[cityNameFromCitiesInPlay]} alt="Image" height={150} width={150} />
            </tr>
            <tr>
              <City cityName={cityNameFromCitiesInPlay} status={cityStatus} onClick={onCityClick} />
            </tr>

          </td>
        )
        }


      </table>

      <table>

        {selectedCity ?

          <React.Fragment>
            <tr>
              <td>
                {correctOrIncorrectMessage(selectedCity)}
              </td>
            </tr>


            {utils.displayCitiesInPlay(citiesInPlay).map(cityNameFromCitiesInPlay =>
              <tr><td>{cityNameFromCitiesInPlay} has {citiesInPlay[cityNameFromCitiesInPlay]} inches of precipitation annually.</td></tr>
            )
            }





            {(gameStatus == 'active') ?
              <React.Fragment>
                <tr><td>questions answered: {numberAnswered}</td></tr>
                <tr><td>correct answers: {numberCorrectAnswered}</td></tr>
                <tr><td><NextQuestion onClick={onNextQuestionClick} /></td></tr>
              </React.Fragment> : <b></b>
            }

          </React.Fragment>


          : <b></b>
        }


        {gameStatus !== 'active' ?
          <React.Fragment>
            <tr><td>GAME OVER!</td></tr>
            <tr><td>Final Score </td></tr>

            <tr><td>Correct answers: {numberCorrectAnswered}</td></tr>

            <tr><td>Total questions: {numberAnswered}</td></tr>

            <tr><td>Percentage Correct: {utils.percentage(numberCorrectAnswered, numberAnswered)}%</td></tr>

            <tr><td><PlayAgain onClick={props.startNewGame} /></td></tr>
          </React.Fragment>
          : <b></b>
        }




      </table>




    </React.Fragment>

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

const cityFileNames = {
  "Atlanta, Georgia": Atlanta,
  "Austin, Texas": Austin,
  "Baltimore, Maryland": Baltimore,
  "Birmingham, Alabama": Birmingham,
  "Boston, Massachusetts": Boston,
  "Buffalo, New York": Buffalo,
  "Denver, Colorado": Denver,

  "Charlotte, North Carolina": Charlotte,

  "Chicago, Illinois": Chicago,
  "Cincinnati, Ohio": Cincinnati,
  "Cleveland, Ohio": Cleveland,
  "Columbus, Ohio": Columbus,
  "Dallas, Texas": Dallas,
  "Denver, Colorado": Denver,
  "Detroit, Michigan": Detroit,
  "Hartford, Connecticut": Hartford,
  "Houston, Texas": Houston,
  "Indianapolis, Indiana": Indianapolis,
  "Jacksonville, Florida": Jacksonville,
  "Kansas City, Missouri": KansasCity,
  "Las Vegas, Nevada": LasVegas,
  "Los Angeles, California": LosAngeles,
  "Louisville, Kentucky": Louisville,
  "Memphis, Tennessee": Memphis,
  "Miami, Florida": Miami,
  "Milwaukee, Wisconsin": Milwaukee,
  "Minneapolis, Minnesota": Minneapolis,
  "Nashville, Tennessee": Nashville,
  "New Orleans, Louisiana": NewOrleans,
  "New York, New York": NewYorkCity,
  "Oklahoma City, Oklahoma": OklahomaCity,
  "Orlando, Florida": Orlando,
  "Philadelphia, Pennsylvania": Philadelphia,
  "Phoenix, Arizona": Phoenix,
  "Pittsburgh, Pennsylvania": Pittsburgh,
  "Portland, Oregon": Portland,
  "Providence, Rhode Island": Providence,
  "Raleigh, North Carolina": Raleigh,
  "Richmond, Virginia": Richmond,
  "Riverside, California": Riverside,
  "Rochester, New York": Rochester,
  "Sacramento, California": Sacramento,
  "Salt Lake City, Utah": SaltLakeCity,
  "San Antonio, Texas": SanAntonio,
  "San Diego, California": SanDiego,
  "San Francisco, California": SanFrancisco,
  "San Jose, California": SanJose,
  "Seattle, Washington": Seattle,
  "St. Louis, Missouri": StLouis,
  "Tampa, Florida": Tampa,
  "Virginia Beach, Virginia": VirginiaBeach,
  "Washington, DC": WashingtonDC,



}


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
