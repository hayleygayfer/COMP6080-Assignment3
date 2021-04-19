import React from 'react';
// import GameThumbnail from '../components/GameThumbnail'
import '../App.css'
import { useHistory } from 'react-router-dom';
import API from '../api.js';
const api = new API('http://localhost:5000');

function Dashboard () {
  const token = localStorage.getItem('token');

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
      alert('Invalid')
    }
  }

  const gameListRequest = async () => {
    try {
      const request = await api.makeAPIRequest('admin/quiz', token, 'GET', '', '');
      if (request.status === 200) {
        console.log('Got Game List');
        // send them to dashboard
        const data = await request.json();
        history.push('/dashboard');
        setGameData(data.quizzes)
        console.log(gameData);
      } else throw request.status
    } catch (error) {
      alert(`Invalid token: ${error}`);
    }
  }

  return (
      <div className='App'>
        <p>Dashboard is a stub</p>
        {/* Unique routes stubs */}
        <div>
          <input
            type="text"
            onChange={e => setNameInput(e.target.value)}
            value={nameInput}
          />
          <button className='button' onClick={createGameRequest}> Create New Quiz </button>
        </div>
        <div>
          <button className='button' onClick={gameListRequest}> Get Dash </button>
        </div>
      </div>
  );
}

export default Dashboard;
