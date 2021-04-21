import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

function QuestionEdit (gId, qId) {
  const token = localStorage.getItem('token');
  const [gameData, setGameData] = React.useState('');
  const [questionString, setQuestionString] = React.useState('');
  const [questionAnswers, setQuestionAnswers] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState('');
  const [questionMedia, setQuestionMedia] = React.useState('');
  const [questionType, setQuestionType] = React.useState('');
  const [correctAnswers, setCorrectAnswers] = React.useState('');
  const gameId = gId.input;
  const questionId = qId.input;

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request) {
        console.log('Got Game Data');
        setGameData(request);
      }
    } catch (error) {
      alert(`Invalid Quiz Request: ${error}`);
      console.log(error);
    }
  }

  let questionEditor = [];
  const openQuestionEditor = () => {
    getGameQuestionsRequest(gameId);
    console.log(gameData)

    setQuestionString(gameData.questions[questionId].questionString);
    setQuestionAnswers(gameData.questions[questionId].answers);
    setTimeLimit(gameData.questions[questionId].timeLimit);
    setQuestionMedia(gameData.questions[questionId].imgSource);
    setQuestionType(gameData.questions[questionId].questionType);
    setCorrectAnswers(gameData.questions[questionId].correctAnswers);

    questionEditor.push(<>
      <div>
        Question: <input
          type="text"
          onChange={e => setQuestionString(e.target.value)}
          value={questionString}
        />
        Question Type: <input
          type="text"s
          onChange={e => setQuestionType(e.target.value)}
          value={questionType}
        />
        Time Limit: <input
          type="text"
          onChange={e => setTimeLimit(e.target.value)}
          value={timeLimit}
        />
        All Answer(s): <input
          type="text"
          onChange={e => setQuestionAnswers(e.target.value)}
          value={questionAnswers}
        />
        Correct Answer(s) (Part of your current answers): <input
          type="text"
          onChange={e => setCorrectAnswers(e.target.value)}
          value={correctAnswers}
        />
        Image or Video: <input
          type="text"
          onChange={e => setQuestionMedia(e.target.value)}
          value={questionMedia}
        />
      </div>
      <button className='button' onClick={editGameQuestionsRequest(gameId, false)}> Submit Changes </button>
      <button className='button' onClick={editGameQuestionsRequest(gameId, true)}> Delete Question </button>
    </>)
  }

  const editGameQuestionsRequest = async (quizId, deleteQuestion) => {
    if (deleteQuestion === true) {
      gameData.questions.splice(questionId, 1);
    } else {
      gameData.questions[questionId].questionString = questionString;
      gameData.questions[questionId].answers = questionAnswers;
      gameData.questions[questionId].timeLimit = timeLimit;
      gameData.questions[questionId].imgSource = questionMedia;
      gameData.questions[questionId].questionType = questionType;
      gameData.questions[questionId].correctAnswers = correctAnswers;
    }

    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'PUT', '', gameData);
      if (request) {
        console.log('Updated Game Data');
        questionEditor = [];
      }
    } catch (error) {
      alert(`Invalid Update Game Request: ${error}`);
      console.log(error);
    }
  }

  return (<>
    <button className='button' onClick={openQuestionEditor}> Edit Question </button>
    {questionEditor}
  </>);
}

QuestionEdit.propTypes = {
  gameId: PropTypes.number,
  questionId: PropTypes.number
};

export default QuestionEdit;
