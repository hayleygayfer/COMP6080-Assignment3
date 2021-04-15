import React from 'react';
/*
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Dashboard from './Dashboard'
*/
import { useHistory } from 'react-router-dom';
import API from '../api.js';
const api = new API('http://localhost:5005');

function Login () {
  const history = useHistory();
  const loginRequest = async () => {
    try {
      const request = await api.makeAPIRequest('admin/auth/login', '', 'POST', '', {
        email: emailInput,
        password: passwordInput,
      })
      if (request.status === 200) {
        console.log('Successful Login');
        // send them to dashboard
        const data = await request.json();
        console.log(data.token)
        localStorage.setItem('token', data.token);
        history.push('/dashboard');
        // get token... store somewhere
      } else throw request.status
    } catch (error) {
      alert(error)
    }
  }

  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  return <>
    <h2> Login, Darling </h2>
    <div>
      <div>
        Email:
        <input
          type="text"
          onChange={e => setEmailInput(e.target.value)}
          value={emailInput}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          onChange={e => setPasswordInput(e.target.value)}
          value={passwordInput}
        />
      </div>
    </div>
    <button onClick={loginRequest}> Send </button>
  </>;
}

export default Login;
