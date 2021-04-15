import React from 'react';
import API from '../api.js';
const api = new API('http://localhost:5005');

function Register () {
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
      if (request.status === 200) console.log('Successful Login');
      else throw request.status
    } catch (error) {
      alert(error)
    }
    console.log({
      email: emailInput,
      password: passwordInput,
      name: nameInput
    })
  }

  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');

  return <>
    <h2> Register, Mlord </h2>
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
      <div>
        Name:
        <input
          type="text"
          onChange={e => setNameInput(e.target.value)}
          value={nameInput}
        />
      </div>
    </div>
    <button onClick={registerRequest}> Send </button>
  </>;
}

export default Register;
