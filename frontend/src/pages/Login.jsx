import React from 'react';

function Login () {
  const sendEmails = () => {
    // make api request
    // then copy this into ... register
    console.log(`login request with ${emailInput} and ${passwordInput}`)
    // will put this part into a function once i get it working, similar to this post: https://edstem.org/courses/5307/discussion/430203
    fetch('http://localhost:5005/admin/auth/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: emailInput,
        password: passwordInput
      }
    })
    // Here is the catch for the fetch, I wasn't sure if it was intentionally left out so I've commented it out
  /* ).then(data => {
      if (data.status === 200) console.log('Successful Login');
    }).catch((error) => {
      alert('Error: ', error);
    }) */
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
    <button onClick={sendEmails}> Send </button>
  </>;
}

export default Login;
