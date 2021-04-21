import React from 'react';
import '../App.css';
import API from '../api.js';
const api = new API('http://localhost:5005');

function AdvanceQuestion () {
  const token = localStorage.getItem('token');
  const gameId = localStorage.getItem('gameIdOfStartedGame');
  const [questionTime, setQuestionTime] = React.useState(0);

  const getGameRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${gameId}`, token, 'GET', '', '');
      if (request) {
        console.log('got Game Data');
        return request;
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

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      advanceQuestionRequest();
    }, questionTime);
    return () => clearTimeout(timer);
  }, []);

  const progressQuiz = () => {
    getGameRequest().then((gameData) => {
      if (gameData.questions.length === 0) return 1;
      let i = 1;
      questionTime = gameData.questions[0].timeLimit;
      while (i < gameData.questions.length) {
        if (timeLeft === 0) {
          setQuestionTime(gameData.questions[i].timeLimit);
          i++;
        }
      }
    });
  }
}

export default AdvanceQuestion;
