import React from 'react';
import '../App.css'
import API from '../api.js';
import { Chart } from 'react-charts'
const api = new API('http://localhost:5005');

function GameResults () {
  const token = localStorage.getItem('token');
  const gameId = localStorage.getItem('gameIdForResults');
  const sessionId = localStorage.getItem('sessionIdForResults');

  console.log(gameId);

  /* const getResultsRequest = async () => {
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
  } */

  const getSessionRequest = async (sessionId) => {
    try {
      const request = await api.makeAPIRequest(`admin/session/${sessionId}/results`, token, 'GET', '', '');
      if (request) {
        console.log('Got Session Data');
        return request;
      }
    } catch (error) {
      alert(`Invalid Question Request: ${error}`);
      console.log(error);
    }
  }

  const calculateTopFive = (results) => {
    if (!results.answers) return 1;
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
    if (!results.answers) return 1;
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
    const displayData = [];
    getSessionRequest(sessionId).then((sessionData) => {
      console.log(sessionData);
      if (sessionData.length === 0) {
        return (<p>There are no results for this quiz!</p>);
      }

      const topFive = calculateTopFive(sessionData);
      const questionData = questionStats(sessionData);

      const topDisplay = [];
      for (let i = 0; i < topFive.length; i++) {
        topDisplay.push(<>
          {topFive[i].name} : {topFive[i].score}
        </>)
      }

      displayData.push(<>
        {topDisplay}
        {convertToChart(questionData)}
      </>);

      return displayData;
    });
  }

  const convertToChart = (qData) => {
    const dataSpreadCorrect = [];
    const dataSpreadResponse = [];
    for (let i = 0; i < qData.length; i++) {
      dataSpreadCorrect.push([i, qData[i].correct])
      dataSpreadResponse.push([i, qData[i].responseTime])
    }

    const data = React.useMemo(
      () => [
        {
          label: 'Series 1',
          data: dataSpreadCorrect
        },
        {
          label: 'Series 2',
          data: dataSpreadResponse
        },
      ],
      []
    )

    const axes = React.useMemo(
      () => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
      []
    )

    const lineChart = (
      // A react-chart hyper-responsively and continuously fills the available
      // space of its parent element automatically
      <div
        style={{
          width: '400px',
          height: '300px'
        }}
      >
        <Chart data={data} axes={axes} />
      </div>
    )
    return lineChart;
  }

  return (<>
    <button className='button' onClick={() => displayResultsData()}> Get Results </button>
  </>);
}

export default GameResults;
