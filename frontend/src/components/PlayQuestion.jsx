import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

/* STUB */
function PlayQuestion () {
  // commenting out temporarily to avoid linting errors
  const [questionData, setQuestionData] = React.useState('');
  const [questionTime, setQuestionTime] = React.useState('');
  const [answerId, setAnswerId] = React.useState('');
  const [correctAnswer, setCorrectAnswer] = React.useState('');

  const history = useHistory();
  const playID = localStorage.getItem('playID');
  console.log(playID);
  const answersList = [];
  const getQuestionRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`play/${playID}/question`, '', 'GET', '', '');
      if (request.status === 200) {
        console.log('Got Question');
        const data = await request.json();
        console.log(data);
        console.log(data.quizQuestionPublicReturn);
        setQuestionData(data.quizQuestionPublicReturn);
        setQuestionTime(data.isoTimeLastQuestionStarted);
        for (let i = 0; i < questionData.answers.length; i++) {
          answersList.push(<>
            <input
              type="radio"
              name="answers"
              onChange={e => sendAnswerRequest(i)}
              value={questionData.answer[i]}
            />
          </>)
        }
        history.push('/play_join');
      } else throw request.status
    } catch (error) {
      alert(`Invalid: ${error}`);
    }
  }

  const sendAnswerRequest = async (answerId) => {
    const answerIdlist = [];
    answerIdlist.push(answerId);
    try {
      const request = await api.makeAPIRequest(`play/${playID}/answer`, '', 'PUT', '', {
        answerIds: answerIdlist,
      });
      if (request.status === 200) {
        console.log('Sent Answer');
        setAnswerId(answerId);
        history.push('/play_join');
      } else throw request.status
    } catch (error) {
      alert(`Invalid Update Answer Request: ${error}`);
      console.log(error);
    }
  }

  const getQuestionResultsRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`play/${playID}/answer`, '', 'GET', '', '');
      if (request.status === 200) {
        console.log('Got Correct Answer');
        const data = await request.json();
        setCorrectAnswer(data.answerIds[0])
        history.push('/play_join');
      } else throw request.status
    } catch (error) {
      alert(`Invalid Get Player Answer Request: ${error}`);
      console.log(error);
    }
    let correct = false;
    if (answerId === correctAnswer) correct = true;

    return (<>
      {correct ? <p>You got it Right!</p> : <p>Better luck next time :(</p>}
      <p>The correct answer was ...</p>
    </>)
  }

  const calculateTimeLeft = () => {
    const difference = +new Date(questionTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      getQuestionRequest();
    }, questionData.timeLimit);
    return () => clearTimeout(timer);
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return <>
    <div>
      Question: {questionData.questionString}
      <img src={questionData.mediaSource} />
      Time Left: {timerComponents.length ? timerComponents : getQuestionResultsRequest}
      Answers: {answersList}
    </div>
  </>
}

export default PlayQuestion;
