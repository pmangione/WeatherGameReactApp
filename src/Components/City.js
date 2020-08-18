import React, { useState } from 'react';
import Colors from '../Colors'

const City = props => (
    <button style={{ backgroundColor: Colors[props.status(props.cityName)], width: "100" }}
        onClick={() => props.onClick(props.cityName)}
    >
        {props.cityName}
    </button>





);



export default City;