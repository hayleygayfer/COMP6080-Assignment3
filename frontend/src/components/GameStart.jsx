import React from 'react';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function GameStart (gameId) {
  // ADD http:// to the front of the url
  const url = window.location.origin + '/play_join?game_id=' + gameId.input
  const startRequest = async () => {
    try {
      // insert token
      const token = localStorage.getItem('token');
      // add https:// to beggining and refresh
      const request = await api.makeAPIRequest('admin/quiz/' + gameId.input + '/start', token, 'POST', '', '')
      console.log(request)
      if (request.status === 200) {
        console.log('Successful Start Request');
      } else throw request.status
    } catch (error) {
    }
  }
  console.log('called startRequest')
  startRequest()
  console.log('finished startRequest')
  return <>
    <p>Game Id: {gameId.input}</p>
    { // LINK TO 'COPY GAME URL' .. which will be /play_join:{gameId.input}
    }
    <button className='button smallButton' onClick={ () => { navigator.clipboard.writeText(url) } }> Copy Link </button>
  </>;
}

export default GameStart;
