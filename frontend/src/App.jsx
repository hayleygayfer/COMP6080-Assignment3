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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/play_join">Join Game</Link>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
