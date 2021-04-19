import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import QuestionEdit from './QuestionEdit'
import PropTypes from 'prop-types';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

function GameEdit (gameId) {
  const [gameQuestions, setGameQuestions] = React.useState('');

  const getGameQuestionsRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'GET', '', '');
      if (request.status === 200) {
        console.log('Got Game Questions');
        const data = await request.json();
        setGameQuestions(data.questions);
      } else throw request.status
    } catch (error) {
      alert('Invalid')
    }
  }

  getGameQuestionsRequest(gameId);
  const questionList = [];

  for (let i = 0; i < gameQuestions.length; i++) {
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
                <Link to="/dashboard/game_edit/question">Edit Game Question</Link>
              </li>
            </ul>
          </nav>
        <Switch>
          <Route path="/dashboard/game_edit/question">
            <QuestionEdit input={gameQuestions[i].id, i}/>
          </Route>
        </Switch>
        </div>
      </Router>
    </>);
  }

  return (<>
    <Router>
      <div>
        <nav>
          <ul>
            {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
            <li>
              <Link to="/dashboard/game_edit/question">Add Question</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/dashboard/game_edit/question">
            <AddQuestion input={gameId}/>
          </Route>
        </Switch>
      </div>
    </Router>
    <div>
      {questionList}
    </div>
  </>);
}

GameEdit.propTypes = {
  gameId: PropTypes.number
};
export default GameEdit;
