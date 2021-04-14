import React from 'react';

function Register () {
  const sendEmails = () => {
    // make api request
    // then copy this into ... register
    console.log(`register request with ${emailInput} and ${passwordInput} and ${nameInput}`)
    // will put this part into a function once i get it working, similar to this post: https://edstem.org/courses/5307/discussion/430203
    fetch('http://localhost:5005/admin/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: emailInput,
        password: passwordInput,
        name: nameInput
      }
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
    <button onClick={sendEmails}> Send </button>
  </>;
}

export default Register;
