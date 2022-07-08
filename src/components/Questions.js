import React from 'react';
export default function Questions(props) {
    let questions = props.questions
    let correctAns = []
    let selectedAns = []
    let correctAndSelected =[]
    const [buttonPressed, setButtonPressed] = React.useState(false)
    // {`You have answered ${correctAns.length}/5 correct answers`}

    function checkAnswers() {
        if(selectedAns.length === 5) {
            setButtonPressed(true)
        } else {
            alert("Answer all the questions first!")
        }
    }
    function newGame() {
        props.handleQuiz()
    }
    function handleClasses() {
        for (let i = 0; i < correctAns.length; i++) {
            const rightAns = correctAns[i]
            for (let j = 0; j < selectedAns.length; j++) {
                if (selectedAns[j] === rightAns) {
                    correctAndSelected.push(rightAns)
                }
            }
        }
        return correctAndSelected
    }
    function styleGenerator(type, condition, condition2) {
        if (type === "selectingAnswer") {
            if (condition) {
               return{ backgroundColor: "#D6DBF5"}
            } 
        } else {
            if(condition) {
                return {backgroundColor : "#94D7A2"}
            } else if (condition2 && !condition) { 
                return {backgroundColor: "#F8BCBC"}
            }
        }
    }
    const mapQuiz = questions.map(item => {
        return (
            <div key = {item.id}>
                <h1 className='question--title' >{item.question}</h1>
                <ul className='options'>
                    {item.answers.map(ans => {
                    if(ans.selected) {
                        ans.isClicked = true
                        selectedAns.push(ans)
                    }
                    if (ans.selected && ans.correct) {
                        correctAns.push(ans)

                    }

                   return <li 
                    key ={ans.id} 
                    style = {buttonPressed ? styleGenerator("displayingAnswer", ans.correct, ans.selected) :  styleGenerator("selectingAnswer", ans.selected)}
                    className = 'notSelected'
                    onClick = {() => props.selectHandle(item.id, ans.id)}
                    >
                    {ans.answer}
                    </li>
                    })}
                </ul>
                <hr></hr>
            </div>
        )
    })
    console.log(buttonPressed)
    console.log(correctAns.length)
    return (
        <div className='question--page'>
            {mapQuiz}
            <br></br>
            {buttonPressed && <span className='data'>{`You have answered ${correctAns.length}/5 correct answers`}</span>}
           {buttonPressed ? <button className='newGame' onClick = {newGame}>New Game</button> : <button onClick={() => checkAnswers()} className='button-ans'>Check Answers</button>} 
        </div>
    )
}