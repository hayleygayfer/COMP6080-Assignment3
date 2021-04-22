import React from 'react';
import '../App.css';
import API from '../api.js';
const api = new API('http://localhost:5005');

function AdvanceQuestion (input) {
  const token = localStorage.getItem('token');
  const gameId = input.input.gameId;

  const [sessionId, setSessionId] = React.useState('');
  const [curQuestion, setCurQuestion] = React.useState('');
  const [questionList, setQuestionList] = React.useState('');
  const [timeStarted, setTimeStarted] = React.useState(0);

  const getSessionIdRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${gameId}`, token, 'GET', '', '')
      if (request) {
        setSessionId(request.active);
        console.log(`Got session id: ${sessionId}`);
      }
    } catch (error) {
      alert(`Couldnt Get Quiz Session: ${error}`);
    }
  }

  const getSessionStatus = async (sessionId) => {
    console.log(sessionId);
    if (!sessionId) return;
    try {
      const request = await api.makeAPIRequest(`admin/session/${sessionId}/status`, token, 'GET', '', '');
      if (request) {
        console.log('got Session Data');
        console.log(request);
        setCurQuestion(request.results.position);
        setQuestionList(request.results.questions);
        setTimeStarted(request.results.isoTimeLastQuestionStarted);
        console.log(timeStarted);
      }
    } catch (error) {
      alert(`Invalid Question Request: ${error}`);
      console.log(error);
    }
  }

  const advanceQuestionRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${gameId}/advance`, token, 'POST', '', '')
      console.log(request)
      if (request.status === 200) {
        console.log('Advanced to next question');
      } else throw request.status
    } catch (error) {
      console.log(error)
    }
  }

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('Use effect');
    const timer = setTimeout(() => {
      setCount(count + 1);
      console.log('Checking if Question is finished');
      getSessionIdRequest().then(() => {
        console.log('In timer run session Id');
        getSessionStatus(sessionId).then(() => {
          console.log('In timer run session status');
          if (curQuestion === -1) {
            console.log('first question');
            advanceQuestionRequest();
            setCount(0);
          } else {
            console.log('getting times');
            const currentTime = new Date();
            const startTime = new Date(timeStarted);
            console.log(currentTime.getTime());
            console.log(startTime.getTime());
            const difference = currentTime.getTime() - startTime.getTime();
            console.log(difference);
            console.log(questionList);
            if (questionList) {
              console.log(questionList);
              console.log(curQuestion);
              if (curQuestion === questionList.length - 1) return;
              if ((difference / 1000) === questionList[curQuestion].timeLimit) {
                advanceQuestionRequest();
                setCount(0);
              }
            }
          }
        });
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (<>
    <div>
      Current Question: {questionList ? questionList[curQuestion].questionString : <p>Getting First Question...</p>}<br/>
      Seconds: {count}
    </div>
  </>)
}

export default AdvanceQuestion;
