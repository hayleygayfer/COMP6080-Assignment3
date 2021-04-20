import React from 'react';
import GameThumbnail from '../components/GameThumbnail'
import '../App.css'
import { useHistory } from 'react-router-dom';
import API from '../api.js';
const api = new API('http://localhost:5005');

function Dashboard () {
  const token = localStorage.getItem('token');
  console.log(token);

  const history = useHistory();

  const [gameData, setGameData] = React.useState('');
  const [newQuizId, setNewQuizId] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');

  const createGameRequest = async () => {
    try {
      const request = await api.makeAPIRequest('admin/quiz/new', token, 'POST', '', {
        name: nameInput,
      });
      if (request.status === 200) {
        console.log('Game Created');
        // send them to dashboard
        const data = await request.json();
        history.push('/dashboard');
        setNewQuizId(data.quizId);
        alert(`Game Created! id: ${newQuizId}`);
        setNameInput('');
        console.log(newQuizId);
      } else throw request.status
    } catch (error) {
      setNameInput('');
      alert(`Invalid New Quiz Request: ${error}`);
      console.log(error);
    }
  }

  const gameListRequest = async () => {
    try {
      const request = await api.makeAPIRequest('admin/quiz', token, 'GET', '', '');
      if (request) {
        console.log('Got Game List');
        // send them to dashboard
        history.push('/dashboard');
        setGameData(request.quizzes);
        console.log(gameData);
      } else {
        return false;
      }
    } catch (error) {
      alert(`Invalid Game List Request: ${error}`);
      console.log(error);
      return false;
    }
    return true;
  }

  return (
      <div className='App'>
        {/* Unique routes stubs */}
        <div>
          <input
            type="text"
            onChange={e => setNameInput(e.target.value)}
            value={nameInput}
          />
          <button className='button' onClick={createGameRequest}> Create New Quiz </button>
        </div>
        <button className='button' onClick={gameListRequest}> Display Dash </button>
        <GameThumbnail gameList={gameData} />
      </div>
  );
}

export default Dashboard;
