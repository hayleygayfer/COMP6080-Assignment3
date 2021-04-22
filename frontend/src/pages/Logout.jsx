import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css'

function Logout () {
  document.getElementById('login').className = '';
  document.getElementById('register').className = '';
  document.getElementById('dashboard').className = 'hidden';
  document.getElementById('join-game').className = 'hidden';
  document.getElementById('logout').className = 'hidden';
  // redirect to logout
  const history = useHistory();
  history.push('/login')
  return <> </>
}

export default Logout;
