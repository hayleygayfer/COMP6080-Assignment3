import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function AddQuestion (id) {
  const token = localStorage.getItem('token');
  const [gameData, setGameData] = React.useState('');
  const [questionString, setQuestionString] = React.useState('');
  const [questionAnswers, setQuestionAnswers] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState('');
  const [questionMedia, setQuestionMedia] = React.useState('');
  const gameId = id.input;

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request.status === 200) {
        console.log('Got Game Data');
        const data = await request.json();
        setGameData(data);
      } else throw request.status
    } catch (error) {
      alert(`Invalid Quiz Request: ${error}`);
      console.log(error);
    }
  }

  let questionEditor = [];
  const openQuestionEditor = () => {
    getGameQuestionsRequest(gameId);
    questionEditor.push(<>
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
        Answers: <input
          type="text"
          onChange={e => setQuestionAnswers(e.target.value)}
          value={questionAnswers}
        /><br/>
        Image or Video: <input
          type="text"
          onChange={e => setQuestionMedia(e.target.value)}
          value={questionMedia}
        /><br/>
      </div>
      <button className='button' onClick={addGameQuestionsRequest(gameId)}> Submit Question </button>
    </>)
  }

  const newQuestion = {
    questionString: questionString,
    answers: questionAnswers,
    timeLimit: timeLimit,
    imgSource: questionMedia
  };

  const addGameQuestionsRequest = async (quizId) => {
    if (!gameData) return 1;
    gameData.questions.push(newQuestion);

    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'PUT', '', gameData);
      if (request.status === 200) {
        console.log('Updated Game Data');
        questionEditor = [];
      } else throw request.status
    } catch (error) {
      alert(`Invalid Update Question Request: ${error}`);
      console.log(error);
    }
  }

  return (<>
    <button className='button' onClick={openQuestionEditor()}> Open Editor </button>
    {questionEditor}
  </>);
}

AddQuestion.propTypes = {
  gameId: PropTypes.number
};

export default AddQuestion;
