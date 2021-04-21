import React from 'react';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

function GameResults (gameId) {
  const token = localStorage.getItem('token');
  const [gameResults, setGameResults] = React.useState('');
  const [resultsDisplay, setResultsDisplay] = React.useState('');

  const getResultsRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${gameId}/results`, token, 'GET', '', '');
      if (request) {
        console.log('Got Game Questions');
        setGameResults(request);
      }
    } catch (error) {
      alert(`Invalid Question Request: ${error}`);
      console.log(error);
    }
  }

  const calculateTopFive = (results) => {
    const topScores = [];
    topScores.push({
      name: 'dummy',
      score: 0
    });
    for (let i = 0; i < results.length; i++) {
      let score = 0;
      for (let j = 0; j < results.answers.length; j++) {
        if (results.answers[j].correct === true) score += 1;
      }
      for (let k = 0; k < topScores.length; k++) {
        if (score >= topScores[k]) {
          topScores.splice(k - 1, 0, { name: results[i].name, score: score });
          while (topScores.length > 5) {
            topScores.pop();
          }
        }
      }
    }
    return topScores;
  }

  const questionStats = (results) => {
    const answers = [];
    for (let i = 0; i < results.answers.length; i++) {
      answers.push({ question: i, correct: 0, responseTime: 0 });
    }
    for (let j = 0; j < results.length; j++) {
      for (let j = 0; j < results.answers.length; j++) {
        if (results.answers[j].correct === true) answers[j].correct += 1;
        const difference = +new Date(results[j].answeredAt) - +new Date(results[j].questionStartedAt);
        answers[j].responseTime += difference;
      }
    }
    for (let k = 0; k < results.length; k++) {
      answers[k].correct = (answers[k].correct / results.length) * 100;
      answers[k].responseTime = answers[k].responseTime / results.length
    }
    return answers;
  }

  const displayResultsData = () => {
    getResultsRequest();

    if (!gameResults) {
      alert('No results available for this game');
      return 1;
    }

    const topFive = calculateTopFive(gameResults);
    const questionData = questionStats(gameResults);

    const topDisplay = [];
    for (let i = 0; i < topFive.length; i++) {
      topDisplay.push(<>
        {topFive[i].name} : {topFive[i].score}
      </>)
    }

    const dataDisplay = [];
    for (let j = 0; j < questionData.length; j++) {
      dataDisplay.push(<>
        Question: {questionData[j].question} | Correct: {questionData[j].correct}% | Avg Response Time: {questionData[j].responseTime}
      </>)
    }
    setResultsDisplay(<>
      Results:
      {topDisplay}<br/>
      {dataDisplay}<br/>
    </>)
  }

  return (<>
    <button className='button' onClick={() => displayResultsData()}> Get Results </button>
    {resultsDisplay}
  </>);
}

export default GameResults;
