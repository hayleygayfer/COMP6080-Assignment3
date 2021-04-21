import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import QuestionEdit from './QuestionEdit';
import AddQuestion from '../components/AddQuestion';
import PropTypes from 'prop-types';
import Modal from '../components/Modal'
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

function GameEdit (id) {
  const token = localStorage.getItem('token');
  const [gameQuestions, setGameQuestions] = React.useState('');
  const gameId = id.input;
  const [show, setShow] = React.useState(false);
  const [game, setGame] = React.useState('');
  const [questionList, setQuestionList] = React.useState('');
  const [qId, setQId] = React.useState('');
  const [questionPath, setQuestionPath] = React.useState('');

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request) {
        console.log('Got Game Questions');
        setGameQuestions(request.questions);
        setGame(request);
      }
    } catch (error) {
      alert(`Invalid Question Request: ${error}`);
      console.log(error);
    }
  }
  // quick change
  let questions = [];
  const displayQuestions = (gameId) => {
    if (questions.length) {
      questions = [];
      setQuestionList(questions);
      return;
    }
    getGameQuestionsRequest(gameId);

    if (!gameQuestions) {
      console.log('Could not get gameData');
      return;
    }

    for (let i = 0; i < gameQuestions.length; i++) {
      questions.push(<>
        <div key="div" className="question-data">
          Question ID: {i}<br/>
          Question: {gameQuestions[i].questionString}<br/>
          Question Type: {gameQuestions[i].questionType}<br/>
          Time limit: {gameQuestions[i].timeLimit}<br/>
          Point Value: {gameQuestions[i].pointValue}<br/>
          <img key="image" src={gameQuestions[i].mediaSource} /><br/>
          Answers: {gameQuestions[i].answers}<br/>
        </div>
      </>);
    }
    setQuestionList(questions);
  }

  const gamePath = `/dashboard/game_edit/question/:${gameId}`;

  /* const displayQuestionsEverySecond = (gameId) => {
    const [seconds, setSeconds] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        console.log(seconds)
        // do action every second
        displayQuestions(gameId)
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  } */

  const addQInput = {
    game: game,
    id: gameId
  }

  const addInput = {
    title: 'Add Question',
    content: <AddQuestion input={addQInput}/>
  }

  const inputs = {
    gameId: gameId,
    questionId: qId,
  }

  const modalInput = {
    title: 'Edit Question',
    content: <QuestionEdit input={inputs}/>
  }

  return (<>
    <Router>
      <div>
        <nav>
          <Link to={gamePath} onClick={() => {
            setShow(true);
            displayQuestions(gameId);
          }}>Add Question</Link>
          <div>
            Enter Question ID:<input
              type="text"
              onChange={e => {
                setQId(e.target.value);
                setQuestionPath(`/dashboard/game_edit/question/:${gameId}/:${qId}`)
              }}
              value={qId}
            />
          </div>
            <Link to={questionPath} onClick={() => {
              if (qId >= gameQuestions.length || qId < 0) {
                alert('Not a valid Question ID')
              } else {
                setShow(true);
              }
            }}>Edit Question: {qId}</Link>
        </nav>
        <Switch>
          <Route path={gamePath}>
            {console.log('adding')}
            <Modal input={addInput} show={show} onClose={() => setShow(false)}/>
          </Route>
          <Route path={questionPath}>
            {console.log('editing')}
            <Modal input={modalInput} show={show} onClose={() => setShow(false)}/>
          </Route>
        </Switch>
      </div>
    </Router>
    <button className='button' onClick={() => displayQuestions(gameId)}> Show Quiz Questions </button>
    <div>
      {questionList}
    </div>
  </>);
}

GameEdit.propTypes = {
  gameId: PropTypes.number
};
export default GameEdit;
