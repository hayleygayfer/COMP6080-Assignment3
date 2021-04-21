import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

// Import pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
// import Logout from './pages/Logout'
import Register from './pages/Register'
import PlayJoin from './pages/PlayJoin'
import GameResults from './pages/GameResults'
import './App.css';

function App () {
  return (
    <Router>
      <div>
        {/* Unique routes stubs */}
        <nav className='navBar'>
          <ul className='App-link'>
            <li>
              <Link id='login' to="/login">Login</Link>
            </li>
            <li>
              <Link id='register' to="/register">Register</Link>
            </li>
            <li id='dashboard' className='hidden'>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li id='join-game' className='hidden'>
              <Link to="/play_join">Join Game</Link>
            </li>
            <li id='logout' className='hidden'>
              <Link to="/log_out">Logout</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/play_join">
            <PlayJoin />
          </Route>
          <Route path="/game_results">
            <GameResults />
          </Route>
          <Route path="/log_out">
            { /* <Logout /> */ }
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
