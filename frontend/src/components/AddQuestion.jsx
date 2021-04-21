import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

export function AddQuestion (data) {
  const token = localStorage.getItem('token');
  const [questionString, setQuestionString] = React.useState('');
  const [questionAnswers, setQuestionAnswers] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState('');
  const [questionMedia, setQuestionMedia] = React.useState('');
  const [correctAnswers, setCorrectAnswers] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const gameData = data.input.game;
  const gameId = data.input.id;

  const addAnswer = (answer, correct) => {
    if (answer === '' || questionAnswers.indexOf(answer) !== -1) {
      alert('This answer already exists');
      return 1;
    }
    setQuestionAnswers(questionAnswers + answer);
    console.log(questionAnswers);

    if (correct) {
      setCorrectAnswers(correctAnswers + answer);
      console.log(correctAnswers);
    }
    setAnswer('');
  }

  const addGameQuestionsRequest = async (quizId) => {
    if (questionAnswers.length === 0 || correctAnswers.length === 0) {
      alert('Please enter at least one correct answer');
      return 1;
    }

    const newQuestion = {
      questionString: questionString,
      answers: questionAnswers,
      correctAnswers: correctAnswers,
      timeLimit: timeLimit,
      imgSource: questionMedia
    };

    if (!gameData) {
      console.log(gameData);
      return 1;
    }
    gameData.questions.push(newQuestion);

    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'PUT', '', gameData);
      console.log(request);
      if (request) {
        console.log('Updated Game Data');
      }
    } catch (error) {
      alert(`Invalid Update Question Request: ${error}`);
      console.log(error);
    }
  }

  return (<>
    <div>
      Question: <input
        type="text"
        onChange={e => setQuestionString(e.target.value)}
        value={questionString}
      /><br/>
      Time Limit: <input
        type="text"
        onChange={e => setTimeLimit(e.target.value)}
        value={timeLimit}
      /><br/>
      <div>
        Answer: <input
          type="text"
          onChange={e => setAnswer(e.target.value)}
          value={answer}
        /><br/>
        <button className="button" onClick={() => addAnswer(answer, true)}>Add Answer as Correct</button>
        <button className="button" onClick={() => addAnswer(answer, false)}>Add Answer as Incorrect</button><br/>
        All Answers:<br/>
        {questionAnswers}<br/>
        Correct Answers:<br/>
        {correctAnswers}<br/>
      </div>
      Image or Video: <input
        type="text"
        onChange={e => setQuestionMedia(e.target.value)}
        value={questionMedia}
      /><br/>
    </div>
    <button className='button' onClick={() => addGameQuestionsRequest(gameId)}> Submit Question </button>
  </>);
}

AddQuestion.propTypes = {
  gameId: PropTypes.number
};

export default AddQuestion;
