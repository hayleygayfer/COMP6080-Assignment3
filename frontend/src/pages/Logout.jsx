import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css'

function Logout () {
  if (document.getElementById('login')) document.getElementById('login').className = '';
  if (document.getElementById('register')) document.getElementById('register').className = '';
  if (document.getElementById('logout')) document.getElementById('logout').className = 'hidden';
  if (document.getElementById('dashboard')) document.getElementById('dashboard').className = 'hidden';
  if (document.getElementById('join-game')) document.getElementById('join-game').className = 'hidden';
  // redirect to login
  const history = useHistory();
  history.push('/login')
  return <> </>
}

export default Logout;
