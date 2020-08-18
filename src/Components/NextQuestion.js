import React, { useState } from 'react';
import Colors from '../Colors'


const NextQuestion = (props) => (
    <button style={{ backgroundColor: Colors['gameoverornextquestion'] }} onClick={() => props.onClick()}>
        Next Question
    </button>
);

export default NextQuestion;