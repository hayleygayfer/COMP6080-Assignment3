import React from 'react';

function PlayJoin () {
  const joinGame = () => {
    console.log(nameInput)
    fetch(`http://localhost:5005/play/join/${sessionInput}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        name: nameInput
      }
    }).then((data) => {
      if (data.status === 200) console.log('Joined Game');
    }).catch((error) => {
      alert('Error: ', error);
    });
  };

  const [sessionInput, setSessionInput] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  return <>
    <h2>Join Game Session</h2>
    <div>
      <div>
        Session ID:
        <input
          type="text"
          onChange={e => setSessionInput(e.target.value)}
          value={sessionInput}
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
    <button onClick={joinGame}> Join </button>
  </>
}

export default PlayJoin;
