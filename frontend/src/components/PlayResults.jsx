import React from 'react';

/* STUB */

function PlayResults ({playID}) {
  const getResults = () => {
    fetch(`http://localhost:5005/${playID}/results`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((data) => {
      if (data.status === 200) {
        console.log(`Got Quiz Results for ${playID}`);
        setGameResults(data.json());
      }
    }).catch((error) => {
      alert('Error: ', error);
    });
  };

  const [gameResults, setGameResults] = React.useState('');
  return <>
    Stub
  </>
}

export default PlayResults;