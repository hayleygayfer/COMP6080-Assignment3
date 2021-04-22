import React from 'react';
import '../App.css';
import API from '../api.js';
const api = new API('http://localhost:5005');

function AdvanceQuestion () {
  const token = localStorage.getItem('token');
  const gameId = localStorage.getItem('gameIdOfStartedGame');
  const sessionId = localStorage.getItem('sessionIdOfStartedGame');
  const [curQuestion, setCurQuestion] = React.useState('');
  const [questionList, setQuestionList] = React.useState('');

  const getSessionStatus = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/session/${sessionId}/status`, token, 'GET', '', '');
      if (request) {
        console.log('got Session Data');
        console.log(request);
        setCurQuestion(request.position);
        setQuestionList(request.questions);
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

  const progressQuiz = () => {
    console.log(`Starting Progress Quiz for gameID: ${gameId}`);
    // START QUIZ
    advanceQuestionRequest();
    getSessionStatus();
  }

  React.useEffect(() => {
    console.log('timing');
    const timer = setTimeout(() => {
      advanceQuestionRequest();
      getSessionStatus();
      console.log('advancing');
    }, questionList[curQuestion].timeLimit * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (<>
    <div>
      <button className='button' onClick={() => progressQuiz()}> Start Questions </button><br/>
      Current Question: {curQuestion}
    </div>
  </>)
}

export default AdvanceQuestion;
