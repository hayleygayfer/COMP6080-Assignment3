import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

// /////// TODO
// add pretty CSS to login
//

function Login () {
  const history = useHistory();
  const loginRequest = async () => {
    try {
      console.log('login request...')
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
      // reset username and password fields
      setEmailInput('')
      setPasswordInput('')
      alert('Invalid username or password')
    }
  }

  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  return <>
    <div className='loginOrRegister'>
      <h2> Login </h2>
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
      <button className='button' onClick={loginRequest}> Login </button>
    </div>
  </>;
}

export default Login;
