import React from 'react';
import GameThumbnail from '../components/GameThumbnail';
import CreateGame from '../components/CreateGame';
import Modal from '../components/Modal';
import '../App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import API from '../api.js';
const api = new API('http://localhost:5000');

function Dashboard () {
  const token = localStorage.getItem('token');
  const [gameData, setGameData] = React.useState('');
  const [show, setShow] = React.useState(false);
  console.log(token);

  const history = useHistory();

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

  const createInput = {
    title: 'Create Game',
    content: <CreateGame />
  }

  return (
    <Router>
      <div className='App'>
        <Link to="/dashboard" onClick={() => setShow(true)}> Create New Game </Link>
        <button className='button' onClick={gameListRequest}> Display Dash </button>
        <GameThumbnail gameList={gameData} />
      </div>
      <Switch>
        <Route path="/dashboard">
          <Modal input={createInput} show={show} onClose={() => setShow(false)}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default Dashboard;
