import React from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api.js';
const api = new API('http://localhost:5000');

function Register () {
  const history = useHistory();
  // explaination: async means: don't execute more stuff. wait till this finishes.
  // simpler than .then
  // the syntax:
  // const function = async () -> {
  //   try {
  //     const request = await (api request.....)
  //     [if request status, not 200, throw error... which is caught by catch]
  //   }
  //   catch (error) {
  //     error handling...
  //   }
  // }
  const registerRequest = async () => {
    try {
      const request = await api.makeAPIRequest('admin/auth/register', '', 'POST', '', {
        email: emailInput,
        password: passwordInput,
        name: nameInput
      })
      if (request.status === 200) {
        console.log('Successful Login');
        const data = await request.json();
        localStorage.setItem('token', data.token);
        history.push('/dashboard');
      } else throw request.status
    } catch (error) {
      setEmailInput('')
      setPasswordInput('')
      setNameInput('')
      alert('There is already a registered account with that email')
    }
  }

  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');

  return <>
    <div className='center-card'>
      <h2> Register </h2>
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
      <div>
        Name:
        <input
          type="text"
          onChange={e => setNameInput(e.target.value)}
          value={nameInput}
        />
      </div>
      <button className='button' onClick={registerRequest}> Register </button>
    </div>
  </>;
}

export default Register;
