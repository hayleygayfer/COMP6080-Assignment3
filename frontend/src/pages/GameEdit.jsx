import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import QuestionEdit from './QuestionEdit'

function GameEdit () {
  return (
    <Router>
      <div>
        <p>GameEdit is a stub</p>
        {/* Unique routes stubs */}
        <nav>
          <ul>
            {/* These Routes must be paratmeterised (And placed in the correct positions on the Dashboard), they are just stubs */}
            <li>
              <Link to="/dashboard/game_edit/question">Edit Game Question</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/dashboard/game_edit/question">
            <QuestionEdit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default GameEdit;
