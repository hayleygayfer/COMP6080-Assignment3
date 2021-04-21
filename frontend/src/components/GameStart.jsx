import React from 'react';
import '../App.css'
// import API from '../api.js';

function GameStart (gameId) {
  console.log(gameId.input)
  const url = window.location.origin + '/play_join?game_id=' + gameId.input
  /*
  const api = new API('http://localhost:5005');
  const startRequest = async () => {
    try {
      // insert token
      const token = localStorage.getItem('token');
      console.log('domain  ' + '/admin/session/' + gameId.input + '/status')
      const request = await api.makeAPIRequest('admin/quiz/' + gameId.input + '/start', token, 'POST', '', '')
      console.log(request)
      if (request.status === 200) {
        console.log('Successful Get Quiz Status');
        const data = await request.json();
        console.log('Quiz status data:')
        console.log(data)
      } else throw request.status
    } catch (error) {
      alert('Couldnt Get Quiz Status: ' + error)
    }
  }
  startRequest()
  */
  return <>
    <p>Game Id: {gameId.input}</p>
    { // LINK TO 'COPY GAME URL' .. which will be /play_join:{gameId.input}
    }
    <button className='button smallButton' onClick={ () => { navigator.clipboard.writeText(url) } }> Copy Link </button>
  </>;
}

export default GameStart;
