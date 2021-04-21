import React from 'react';
import '../App.css'

function GameStart (gameId) {
  console.log(gameId.input)
  const url = window.location.origin + '/play_join?game_id=' + gameId.input
  return <>
    <p>Game Id: {gameId.input}</p>
    { // LINK TO 'COPY GAME URL' .. which will be /play_join:{gameId.input}
    }
    <button className='button smallButton' onClick={ () => { navigator.clipboard.writeText(url) } }> Copy Link </button>
  </>;
}

export default GameStart;
