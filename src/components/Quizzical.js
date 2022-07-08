import React from 'react';

export default function Quizzical(props) {

    
    return (
        <div className='quiz--container'>
            <header className='quiz--title'>Quizzical</header>
            <h4 className='quiz--description'>Answer 5 different questions to test your knowledge of Computers.</h4>
            <button className='quiz--button' onClick={props.handleQuiz}>Start quiz</button>
        </div>
    )
}