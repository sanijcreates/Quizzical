import React from 'react';
import Quizzical from './components/Quizzical';
import Questions from './components/Questions';
import mainData from './mainData';
import {nanoid} from 'nanoid';
import data from './data';
import blob1 from './images/toprightBlob.png'
import blob2 from './images/blob 5.png'
export default function App() {

  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  function convertToPlain(str) {
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;"
    };
  return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
  }


  function handleQuiz() {
    setQuizStarted(prevState => !prevState)

  }
  React.useEffect(() => {
      async function getData() {
        const gameData = []
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple")
        const data = await res.json()
        data.results.forEach(dat => {
          const answers = []
          answers.push({
            answer: convertToPlain(dat.correct_answer),
            id: nanoid(),
            selected:false,
            correct: true
          })
          dat.incorrect_answers.forEach(item => {
            answers.push({
              answer: convertToPlain(item),
              id: nanoid(),
              selected: false,
              correct: false
            })
          })
          gameData.push({
            question: dat.question,
            answers: shuffledAnswers(answers),
            id: nanoid()
          })
        })
        setQuestions(gameData)
      }
      getData()
  }, [quizStarted])
function shuffledAnswers(answers) {
  return answers.sort(() => .5 - Math.random())
}
  // function to identify which exact answer got selected
  // it takes two parameters questionId, answerId
  // if questionID matches with the mapped question id then it runs forEach method to all the answers; 
  // if gets 
  function selectHandle(questionId, answerId) {
    setQuestions(prevState => {
      const edited = prevState.map(data => {
        if(data.id === questionId) {
          data.answers.forEach(answer => {
            answer.selected = false
            if(answer.id === answerId) {
              answer.selected = true
            }
          })
        }
        return data
      })
      return edited
    })
  }
  // function getData() {
  //   const gameData = []
  //   mainData.results.forEach(dat => {
  //     const answers = []
  //     answers.push({
  //       answer: dat.correct_answer,
  //       id: nanoid(),
  //       selected:false,
  //     })
  //     dat.incorrect_answers.forEach(item => {
  //       answers.push({
  //         answer: item,
  //         id: nanoid(),
  //         selected: false
  //       })
  //     })
  //     gameData.push({
  //       question: dat.question,
  //       answers: answers,
  //       id: nanoid()
  //     })
  //   })
  //   setQuestions(gameData)
  // }
  console.log(questions)

  return (
    <main className='main--container'>
      <img src = {blob1} alt = 'top right blob' className='blob'></img>
      <img src = {blob2} alt ='bottom left blob' className='blob2'></img>
      {quizStarted ? <Questions 
      questions = {questions}
      selectHandle = {selectHandle}
      handleQuiz = {handleQuiz}

    /> : <Quizzical handleQuiz = {handleQuiz}/>}
    </main>
  )
}