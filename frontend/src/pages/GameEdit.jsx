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
const api = new API('http://localhost:5005');

function GameEdit (id) {
  const token = localStorage.getItem('token');
  const [gameQuestions, setGameQuestions] = React.useState('');
  const gameId = id.input;
  const [show, setShow] = React.useState(false);

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request) {
        console.log('Got Game Questions');
        setGameQuestions(request.questions);
      }
    } catch (error) {
      alert(`Invalid Question Request: ${error}`);
      console.log(error);
    }
  }
  // quick change

  let questionList = [];
  const displayQuestions = (gameId) => {
    if (questionList.length) {
      questionList = [];
      return;
    }
    getGameQuestionsRequest(gameId);

    if (!gameQuestions) {
      console.log('Could not get gameData');
      return;
    }

    for (let i = 0; i < gameQuestions.length; i++) {
      const questionPath = `/dashboard/game_edit/question/:${gameId}/:${i}`;
      const inputs = {
        gameId: gameId,
        questionId: i
      }
      const modalInput = {
        title: 'Edit Question',
        content: <QuestionEdit input={inputs}/>
      }
      questionList.push(<>
        <Router>
          <div className="question-data">
            Question: {gameQuestions[i].questionString}<br/>
            Question Type: {gameQuestions[i].questionType}<br/>
            Time limit: {gameQuestions[i].timeLimit}<br/>
            Point Value: {gameQuestions[i].pointValue}<br/>
            <img src={gameQuestions[i].mediaSource} /><br/>
            Answers: {gameQuestions[i].answers}<br/>
            <nav>
              {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
              <Link to={questionPath} onClick={() => setShow(true)}>Edit Game Question</Link>
            </nav>
          <Switch>
            <Route path={questionPath}>
              <Modal input={modalInput} show={show} onClose={() => setShow(false)}/>
            </Route>
          </Switch>
          </div>
        </Router>
      </>);
    }
  }

  const gamePath = `/dashboard/game_edit/question/:${gameId}`;

  const addInput = {
    title: 'Add Question',
    content: <AddQuestion input={gameId}/>
  }

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

  return (<>
    <Router>
      <div>
        <nav>
          <Link to={gamePath} onClick={() => setShow(true)}>Add Question</Link>
        </nav>
        <Switch>
          <Route path={gamePath}>
            <Modal input={addInput} show={show} onClose={() => setShow(false)}/>
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
