import React from 'react';

/* STUB */

function PlayQuestion ({playID}) {
  const getQuestion = () => {
    fetch(`http://localhost:5005/${playID}/question`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((data) => {
      if (data.status === 200) {
        console.log('Got Question Details');
        setQuestionData(data.json());
      }
    }).catch((error) => {
      alert('Error: ', error);
    });
  };

  const [questionData, setQuestionData] = React.useState('');
  return <>
    Stub
  </>
}

export default PlayQuestion;