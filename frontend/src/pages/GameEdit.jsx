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
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function GameEdit (id) {
  const token = localStorage.getItem('token');
  const [gameQuestions, setGameQuestions] = React.useState('');
  const gameId = id.input;

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request) {
        console.log('Got Game Questions');
        setGameQuestions(request.questions);
      } else {
        return;
      }
    } catch (error) {
      alert(`Invalid Question Request: ${error}`);
      console.log(error);
    }
  }

  let questionList = [];
  const displayQuestions = (gameId) => {
    if (!questionList === []) {
      questionList = [];
      return;
    }

    getGameQuestionsRequest(gameId);

    if (!gameQuestions) return;

    for (let i = 0; i < gameQuestions.length; i++) {
      const questionPath = `/dashboard/game_edit/question?gameId=${gameId}&questionId=${i}`;
      const inputs = {
        gameId: gameId,
        questionId: i
      }
      questionList.push(<>
        <Router>
          <div>
            {gameQuestions[i].questionString}
            Question Type: {gameQuestions[i].questionType}
            Time limit: {gameQuestions[i].timeLimit}
            Point Value: {gameQuestions[i].pointValue}
            <img src={gameQuestions[i].imgsrc} />
            Answers: {gameQuestions[i].answers}
            <nav>
              <ul>
                {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
                <li>
                  <Link to={questionPath}>Edit Game Question</Link>
                </li>
              </ul>
            </nav>
          <Switch>
            <Route path={questionPath}>
              <QuestionEdit input={inputs}/>
            </Route>
          </Switch>
          </div>
        </Router>
      </>);
    }
  }

  const gamePath = `/dashboard/game_edit/question?=gameId${gameId}`;

  return (<>
    <Router>
      <div>
        <nav>
          <ul>
            {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
            <li>
              <Link to={gamePath}>Add Question</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={gamePath}>
            <AddQuestion input={gameId}/>
          </Route>
        </Switch>
      </div>
    </Router>
    <button className='button' onClick={displayQuestions(gameId)}> Show Quiz Questions </button>
    <div>
      {questionList}
    </div>
  </>);
}

GameEdit.propTypes = {
  gameId: PropTypes.number
};
export default GameEdit;
