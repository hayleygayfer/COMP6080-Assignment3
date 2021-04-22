import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function QuestionEdit (gId) {
  const token = localStorage.getItem('token');
  const gameId = gId.input.gameId;
  const questionId = gId.input.questionId;
  const gameData = gId.input.gameData;

  const [questionString, setQuestionString] = React.useState(gameData.questions[questionId].questionString);
  const [questionAnswers, setQuestionAnswers] = React.useState(gameData.questions[questionId].answers);
  const [timeLimit, setTimeLimit] = React.useState(gameData.questions[questionId].timeLimit);
  const [questionMedia, setQuestionMedia] = React.useState(gameData.questions[questionId].imgSource);
  const [questionType, setQuestionType] = React.useState(gameData.questions[questionId].questionType);
  const [correctAnswers, setCorrectAnswers] = React.useState(gameData.questions[questionId].correctAnswers);

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
        alert('Changes submitted!')
        console.log('Updated Game Data');
      }
    } catch (error) {
      alert(`Invalid Update Game Request: ${error}`);
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
      Question Type: <input
        type="text"s
        onChange={e => setQuestionType(e.target.value)}
        value={questionType}
      /><br/>
      Time Limit: <input
        type="text"
        onChange={e => setTimeLimit(e.target.value)}
        value={timeLimit}
      /><br/>
      All Answer(s): <input
        type="text"
        onChange={e => setQuestionAnswers(e.target.value)}
        value={questionAnswers}
      /><br/>
      Correct Answer(s) (Part of your current answers): <input
        type="text"
        onChange={e => setCorrectAnswers(e.target.value)}
        value={correctAnswers}
      /><br/>
      Image or Video: <input
        type="text"
        onChange={e => setQuestionMedia(e.target.value)}
        value={questionMedia}
      /><br/>
    </div>
    <button className='button' onClick={() => editGameQuestionsRequest(gameId, false)}> Submit Changes </button><br/>
    <button className='button' onClick={() => editGameQuestionsRequest(gameId, true)}> Delete Question </button><br/>
  </>);
}

QuestionEdit.propTypes = {
  gameId: PropTypes.number,
  questionId: PropTypes.number
};

export default QuestionEdit;
