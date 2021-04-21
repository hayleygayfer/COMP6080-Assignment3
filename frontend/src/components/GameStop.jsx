import React from 'react';
import '../App.css'
import { useHistory } from 'react-router-dom';
function GameStop (gameId) {
  const history = useHistory();
  const showResults = () => {
    console.log(gameId.input)
    const path = '/game_results?game_id=' + gameId.input
    // GETS THE RIGHT URL... BUT DOESN'T REFRESH
    history.push(path)
    window.location.reload();
  }
  return <>
    <h2> Would you like to see the results? </h2>
    { // LINK TO results (parameterised on the session ID)
      // localStorage.setItem('token', data.token);
    }
    <button className='button smallButton' onClick={showResults}> Yes </button>
  </>;
}

export default GameStop;
