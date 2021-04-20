import React from 'react';
import GameEdit from '../pages/GameEdit'
import GameResults from '../pages/GameResults'
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

  if (!gameData) {
    console.log(gameData)
    return (<></>)
  }

  for (let i = 0; i < gameData.length; i++) {
    gameThumbnails.push(<>
      <Router>
        <div>
          id: {gameData[i].id}<br/>
          Name: {gameData[i].name}<br/>
          <img src={gameData[i].thumbnail}/><br/>
          <nav>
            <ul>
              {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
              <li>
                <Link to="/dashboard/game_edit">Edit Game</Link>
              </li>
              <li>
                <Link to="/dashboard/game_results">Get Game Results</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/dashboard/game_edit">
              <GameEdit input={gameData[i].id}/>
            </Route>
            <Route path="/dashboard/game_results">
              <GameResults input={gameData[i].id}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>)
  }

  console.log(gameThumbnails);

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
