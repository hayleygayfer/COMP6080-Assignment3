import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

function AddQuestion (gameId) {
  const [gameData, setGameData] = React.useState('');
  const [questionString, setQuestionString] = React.useState('');
  const [questionAnswers, setQuestionAnswers] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState('');
  const [questionMedia, setQuestionMedia] = React.useState('');

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request.status === 200) {
        console.log('Got Game Data');
        const data = await request.json();
        setGameData(data);
      } else throw request.status
    } catch (error) {
      alert('Invalid');
    }
  }

  getGameQuestionsRequest(gameId);

  const newQuestion = {
    questionString: questionString,
    answers: questionAnswers,
    timeLimit: timeLimit,
    imgSource: questionMedia
  };

  const addGameQuestionsRequest = async (quizId) => {
    gameData.questions.push(newQuestion);

    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'PUT', '', gameData);
      if (request.status === 200) {
        console.log('Updated Game Data');
      } else throw request.status
    } catch (error) {
      alert('Invalid');
    }
  }

  return (<>
    <div>
      Question: <input
        type="text"
        onChange={e => setQuestionString(e.target.value)}
        value={questionString}
      />
      Time Limit: <input
        type="text"
        onChange={e => setTimeLimit(e.target.value)}
        value={timeLimit}
      />
      Answers: <input
        type="text"
        onChange={e => setQuestionAnswers(e.target.value)}
        value={questionAnswers}
      />
      Image or Video: <input
        type="text"
        onChange={e => setQuestionMedia(e.target.value)}
        value={questionMedia}
      />
    </div>
    <button className='button' onClick={addGameQuestionsRequest(gameId)}> Add Question </button>
  </>);
}

AddQuestion.propTypes = {
  gameId: PropTypes.number
};

export default AddQuestion;
