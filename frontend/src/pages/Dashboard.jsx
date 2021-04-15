import React from 'react';
import '../App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import GameEdit from './GameEdit'
import GameResults from './GameResults'

function Dashboard () {
  const token = localStorage.getItem('token')
  console.log('ayyy dashboard has token:', token)
  return (
    <Router>
      <div className='App'>
        <p>Dashboard is a stub</p>
        {/* Unique routes stubs */}
        <nav>
          <ul>
            {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
            <li>
              <Link to="/dashboard/game_edit">Edit Game</Link>
            </li>
            <li>
              <Link to="/dashboard/game_results">Get Game Results</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/dashboard/game_edit">
            <GameEdit />
          </Route>
          <Route path="/dashboard/game_results">
            <GameResults />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
