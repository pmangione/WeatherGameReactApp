//import React from 'react';
import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { createPortal } from 'react-dom';
import Denver from './Images/Denver.jpg'

//import Button from 'react-bootstrap/Button'
//import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css'

//<img src={Denver} alt="Denver Image" height={100} width={100} />

import { Container, Button, Image, Table, Row, Col } from 'react-bootstrap'


const City = props => (
  /*
  <button style={{ backgroundColor: colors[props.status(props.cityName)], width: "100" }}
    onClick={() => props.onClick(props.cityName)}
  >
    {props.cityName}
  </button>
  */
  <Button style={{ backgroundColor: colors[props.status(props.cityName)] }} className="btn btn-sm btn-block"

    onClick={() => props.onClick(props.cityName)}
  >
    {props.cityName}
  </Button>

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


      <div class="div">
        <p>On average, which city has more precipitation per year?</p>

      </div>


      {/*}
      <Container className="container border ml-1">
        <Row>
          <Col xs={3}><Image src={Denver} height="80%" width="80%" className="img-fluid"></Image>
            <Row>Denver</Row>
          </Col>
          <Col xs={3}><Image src={Denver} height="80%" width="80%" className="img-fluid"></Image>
            <Row>Denver</Row>
          </Col>
          <Col>3 of 3</Col>
        </Row>
        </Container>

  */}

      {/*<Container className="container border ml-1">*/}
      <Container className="container border ml-0 pl-0">
        <Row>
          {utils.displayCitiesInPlay(citiesInPlay).map(cityNameFromCitiesInPlay =>


            <Col className="pull-left" xs={3}>
              <Image src={Denver} height="100%" width="100%" className="img-fluid img-ml-0 img-pl-0"></Image>
              <Row>
                <City cityName={cityNameFromCitiesInPlay} status={cityStatus} onClick={onCityClick} />
              </Row>
            </Col>
          )
          }
          <Col></Col>

        </Row>
      </Container>




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




    </React.Fragment >

  );
}







function App() {
  const [weatherGameID, setWeatherGameID] = useState(1);

  return (

    <React.Fragment>



      {/*} <Button>Test Button</Button>

      <Image src={Denver} height="20%" width="20%" className="img-fluid"></Image>
  */}

      <WeatherGame key={weatherGameID} startNewGame={() => setWeatherGameID(weatherGameID + 1)} />

    </React.Fragment>

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
