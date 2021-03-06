import React from 'react';
import PlayGame from './PlayGame'

import { useHistory } from 'react-router-dom';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function PlayJoin () {
  let [sessionInput, setSessionInput] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  const [playId, setPlayId] = React.useState('');
  const history = useHistory();
  // if query in the url... add it to gameId input
  if (window.location.search) {
    const gameId = window.location.search.replace('?game_id=', '')
    console.log(gameId)
    // setState rerenders the app, causing infinite loop, so change sessionInput manually in this case
    sessionInput = gameId;
  }
  const joinGameRequest = async () => {
    console.log(sessionInput);
    try {
      const request = await api.makeAPIRequest(`play/join/${sessionInput}`, '', 'POST', '', {
        name: nameInput,
      })
      if (request.status === 200) {
        console.log('Joined Game');
        const data = await request.json();
        console.log(data.playerId);
        localStorage.setItem('playID', data.playerId);
        setPlayId(data.playerId);
        history.push('/play_join');
      } else throw request.status
    } catch (error) {
      setNameInput('');
      setSessionInput('');
      alert(`Invalid Join Request: ${error}`);
    }
  }

  let joined = false;
  if (playId !== '') joined = true;
  console.log('joined the game yet babes?')
  console.log(joined)
  const joinGameCard = (<>
    <div className='App'>
      <h2>Join Game Session</h2>
      <div>
        <div>
          Session ID:
          <input
            type="text"
            onChange={e => setSessionInput(e.target.value)}
            value={sessionInput}
          />
        </div>
        <div>
          Name:
          <input
            type="text"
            onChange={e => setNameInput(e.target.value)}
            value={nameInput}
          />
        </div>
      </div>
      <button className='button smallButton' onClick={joinGameRequest}> Join </button>
    </div>
  </>)

  return <>
    {joined ? <PlayGame /> : joinGameCard}
  </>
}

export default PlayJoin;
