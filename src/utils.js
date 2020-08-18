import React, { useState } from 'react';



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

export default utils;