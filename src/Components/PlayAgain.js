import React, { useState } from 'react';
import Colors from '../Colors'


const PlayAgain = (props) => (
    <button style={{ backgroundColor: Colors['gameoverornextquestion'] }} onClick={props.onClick}>Play Again</button>
);


export default PlayAgain;