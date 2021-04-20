import React from 'react';
import GameEdit from '../pages/GameEdit'
import GameResults from '../pages/GameResults'
import Modal from './Modal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css'

/* STUB */
function GameThumbnail (gameList) {
  const gameThumbnails = [];
  const gameData = gameList.gameList;
  const [show, setShow] = React.useState(false);

  if (!gameData) {
    console.log(gameData)
    return (<></>)
  }

  for (let i = 0; i < gameData.length; i++) {
    const gameEditPath = `/dashboard/game_edit/:${gameData[i].id}`;
    const gameResultsPath = `/dashboard/game_results/:${gameData[i].id}`;
    const editInput = {
      title: 'Edit Game',
      content: <GameEdit input={gameData[i].id}/>
    }
    const resultsInput = {
      title: 'Results',
      content: <GameResults input={gameData[i].id}/>
    }
    gameThumbnails.push(<>
      <Router>
        <div className="game-card" key='game-card'>
          id: {gameData[i].id}<br/>
          Name: {gameData[i].name}<br/>
          <img src={gameData[i].thumbnail} key='img'/><br/>
          <nav key='nav'>
            <ul>
              {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
              <li>
                <Link to={gameEditPath} onClick={() => setShow(true)}>Edit Game</Link>
              </li>
              <li>
                <Link to={gameResultsPath} onClick={() => setShow(true)}>Get Game Results</Link>
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
