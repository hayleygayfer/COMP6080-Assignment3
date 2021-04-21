import React from 'react';
import '../App.css'
import API from '../api.js';

function GameStart (gameId) {
  const url = window.location.origin + '/play_join?game_id=' + gameId.input
  const api = new API('http://localhost:5005');
  const startRequest = async () => {
    try {
      // insert token
      const token = localStorage.getItem('token');
      await api.makeAPIRequest('admin/quiz/' + gameId.input + '/start', token, 'POST', '', '')
    } catch (error) {
    }
  }
  startRequest()
  return <>
    <p>Game Id: {gameId.input}</p>
    { // LINK TO 'COPY GAME URL' .. which will be /play_join:{gameId.input}
    }
    <button className='button smallButton' onClick={ () => { navigator.clipboard.writeText(url) } }> Copy Link </button>
  </>;
}

export default GameStart;
