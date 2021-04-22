import React from 'react';
import GameEdit from '../pages/GameEdit'
import GameResults from '../pages/GameResults'
import GameStart from './GameStart'
import GameStop from './GameStop'
import GameDelete from './GameDelete'
import Modal from './Modal'
import GameInfo from './GameInfo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css'
// import API from '../api.js';

const ShowQuestionInfo = (props) => {
  // const api = new API('http://localhost:5005');
  const QuestionDataToDisplay = []
  // const [questionData, setQuestionData] = React.useState([]);

  const getQuestionData = async () => {
    // NOTE - I can get the right data, just can't seem to push it to QuestionDataToDisplay
    QuestionDataToDisplay.push(
    <>
    Questions: <br/>
    Est. time to complete: <br/>
    </>)
    /*
    const token = localStorage.getItem('token');
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${props.gameId}`, token, 'GET', '', '');
      if (request) {
        setQuestionData(request.questions)
        )
      }
    } catch (error) {
      alert(`Invalid: ${error}`);
    }
    console.log('question data')
    console.log(questionData)
    */
  }
  console.log('question data to display:')
  console.log(QuestionDataToDisplay)
  getQuestionData()
  return <>
  {QuestionDataToDisplay}
  </>
}

ShowQuestionInfo.propTypes = {
  gameId: PropTypes.number,
}

function GameThumbnail (gameList) {
  const gameThumbnails = [];
  const gameData = gameList.gameList;
  const [show, setShow] = React.useState(false);

  if (!gameData) {
    console.log(gameData);
    return (<></>);
  }

  for (let i = 0; i < gameData.length; i++) {
    const gameEditPath = `/dashboard/game_edit/:${gameData[i].id}`;
    const gameResultsPath = `/dashboard/game_results/:${gameData[i].id}`;
    const gameStartPath = '/dashboard/game_start/';
    const gameStopPath = '/dashboard/game_stop/';
    const gameDeletePath = '/dashboard/game_delete/';
    const editInput = {
      title: 'Edit Game',
      content: <GameEdit input={gameData[i].id}/>
    }
    const resultsInput = {
      title: 'Results',
      content: <GameResults input={gameData[i].id}/>
    }
    const deleteInput = {
      title: 'Delete Game?',
      content: <GameDelete input={gameData[i].id}/>
    }
    const startInput = {
      title: 'Start Game:',
      content: <GameStart input={gameData[i].id}/>
    }
    const stopInput = {
      title: 'Stop Game:',
      content: <GameStop input={gameData[i].id}/>
    }
    // get quiz active status using GET /admin/session/{sessionid}/status
    // (up in above funct)
    // determine whether this quiz has started (aka is active)
    let started = false;
    if (gameData[i].active === null) started = true

    gameThumbnails.push(<>
      <Router>
        <div className="game-card" key='game-card'>
          <GameInfo title={gameData[i].name} thumbnail={gameData[i].thumbnail}/>
          <ShowQuestionInfo gameId={gameData[i].id} />
          <nav key='nav'>
            <ul>
              {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
              <li>
                <Link to={gameEditPath} onClick={() => setShow(true)}>Edit Game</Link>
              </li>
              <li>
                <Link to={gameResultsPath} onClick={() => setShow(true)}>Get Game Results</Link>
              </li>
              {
                // if active: start game link
                // if not active: stop game link
                //     so: {started ? <start_link/> : <end_link/>}
              }
              <li>
                {started ? <Link to={gameStartPath} onClick={() => setShow(true)}>Start Game</Link> : <Link to={gameStopPath} onClick={() => setShow(true)}>Stop Game</Link> }
              </li>
              <li>
                <Link to={gameDeletePath} onClick={() => setShow(true)}>Delete Game</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path={gameEditPath}>
              <Modal input={editInput} show={show} onClose={() => setShow(false)}/>
            </Route>
            <Route path={gameResultsPath}>
              <Modal input={resultsInput} show={show} onClose={() => setShow(false)}/>
            </Route>
            <Route path={gameStartPath}>
              <Modal input={startInput} show={show} onClose={() => setShow(false)}/>
            </Route>
            <Route path={gameStopPath}>
              <Modal input={stopInput} show={show} onClose={() => setShow(false)}/>
            </Route>
            <Route path={gameDeletePath}>
              <Modal input={deleteInput} show={show} onClose={() => setShow(false)}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>)
  }

  return <>
    <div>
      {gameThumbnails}
    </div>
  </>
}

GameThumbnail.propTypes = {
  gameData: PropTypes.arrayOf(PropTypes.object)
};
export default GameThumbnail;
