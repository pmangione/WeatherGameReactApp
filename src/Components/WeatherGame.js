import React, { useState } from 'react';


import { createPortal } from 'react-dom';
import Colors from '../Colors';

import City from './City'
import NextQuestion from './NextQuestion'
import PlayAgain from './PlayAgain'
import cityFileNames from '../cityFileNames'
import utils from '../utils.js'



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
        return 'YOU ARE CORRECT!';
      }
      else {
        return 'SORRY, THAT IS NOT CORRECT!';
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
                  <b> {correctOrIncorrectMessage(selectedCity)} </b>
                </td>
              </tr>
  
  
              {utils.displayCitiesInPlay(citiesInPlay).map(cityNameFromCitiesInPlay =>
                <tr><td>{cityNameFromCitiesInPlay} has {citiesInPlay[cityNameFromCitiesInPlay]} inches of precipitation annually.</td></tr>
              )
              }
  
              {(gameStatus == 'active') ?
                <React.Fragment>
                  <tr><td><b>QUESTIONS ANSWERED: {numberAnswered}</b></td></tr>
                  <tr><td><b>CORRECT ANSWERS: {numberCorrectAnswered}</b></td></tr>
                  <tr><td><NextQuestion onClick={onNextQuestionClick} /></td></tr>
                </React.Fragment> : <b></b>
              }
  
            </React.Fragment>
  
  
            : <b></b>
          }
  
  
          {gameStatus !== 'active' ?
            <React.Fragment>
              <tr><td><b><big><font color={{ Colors: ['gameoverornextquestion'] }}>GAME OVER!</font></big></b></td></tr>
              <tr><td><b>FINAL SCORE </b></td></tr>
  
              <tr><td><b>CORRECT ANSWERS: {numberCorrectAnswered}</b></td></tr>
  
              <tr><td><b>TOTAL QUESTIONS: {numberAnswered}</b></td></tr>
  
              <tr><td><b>PERCENTAGE CORRECT: {utils.percentage(numberCorrectAnswered, numberAnswered)}%</b></td></tr>
  
              <tr><td><b><PlayAgain onClick={props.startNewGame} /></b></td></tr>
            </React.Fragment>
            : <b></b>
          }
  
        </table>

      </React.Fragment>
  
    );
  }

  export default WeatherGame;