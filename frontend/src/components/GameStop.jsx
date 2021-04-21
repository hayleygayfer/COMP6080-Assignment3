import React from 'react';
import '../App.css'
import { useHistory } from 'react-router-dom';
import API from '../api.js';
const api = new API('http://localhost:5005');
function GameStop (gameId) {
  const history = useHistory();
  const showResults = () => {
    console.log(gameId.input)
    const path = '/game_results?game_id=' + gameId.input
    // GETS THE RIGHT URL... BUT DOESN'T REFRESH
    history.push(path)
    window.location.reload();
  }

  const stopRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('domain  ' + '/admin/session/' + gameId.input + '/status')
      const request = await api.makeAPIRequest('admin/quiz/' + gameId.input + '/end', token, 'POST', '', '')
      console.log(request)
      if (request.status === 200) {
        console.log('Successful Stop Request');
      } else throw request.status
    } catch (error) {
    }
  }
  stopRequest()

  return <>
    <h2> Would you like to see the results? </h2>
    { // LINK TO results (parameterised on the session ID)
      // localStorage.setItem('token', data.token);
    }
    <button className='button smallButton' onClick={showResults}> Yes </button>
  </>;
}

export default GameStop;
