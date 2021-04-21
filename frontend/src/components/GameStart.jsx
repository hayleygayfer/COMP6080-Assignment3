import React from 'react';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function GameStart (gameId) {
  const url = `${window.location.origin}/play_join?game_id=${gameId.input}`;
  const token = localStorage.getItem('token');
  const [sessionId, setSessionId] = React.useState('');

  const startRequest = async () => {
    try {
      // insert token
      console.log('domain  ' + '/admin/session/' + gameId.input + '/status')
      const request = await api.makeAPIRequest(`admin/quiz/${gameId.input}/start`, token, 'POST', '', '')
      console.log(request)
      if (request.status === 200) {
        console.log('Successful Get Quiz Status');
        const data = await request.json();
        console.log('Quiz status data:')
        console.log(data)
        alert('Game Started!')
        getSessionIdRequest();
        localStorage.setItem('gameIdOfStartedGame', gameId.input);
      } else if (request.status === 400) {
        alert('Game has already been started!');
      } else throw request.status
    } catch (error) {
    }
  }

  const getSessionIdRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${gameId.input}`, token, 'GET', '', '')
      console.log(request)
      if (request) {
        setSessionId(request.active);
        localStorage.setItem('sessionIdForResults', request.active);
        localStorage.setItem('sessionIdOfStartedGame', request.active);
      }
    } catch (error) {
      alert(`Couldnt Get Quiz Session: ${error}`);
    }
  }

  return <>
    <button className='button' onClick={() => startRequest()}> Start Game </button>
    <p>Session Id: {sessionId}</p>
    { // LINK TO 'COPY GAME URL' .. which will be /play_join:{gameId.input}
    }
    <button className='button smallButton' onClick={ () => { navigator.clipboard.writeText(url) } }> Copy Game URL </button>
  </>;
}

export default GameStart;
