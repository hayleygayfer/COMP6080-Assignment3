import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5000');

/* STUB */
function PlayQuestion ({ playID }) {
  // commenting out temporarily to avoid linting errors
  const [questionData, setQuestionData] = React.useState('');
  // const [questionTime, setQuestionTime] = React.useState('');

  const history = useHistory();
  const getQuestionRequest = async () => {
    try {
      const request = await api.makeAPIRequest(`admin/play/join/${playID}`, '', 'GET', '', {});
      if (request.status === 200) {
        console.log('Get Question');
        const data = await request.json();
        setQuestionData(data.quizQuestionPublicReturn);
        // setQuestionTime(data.isoTimeLastQuestionStarted);
        history.push('/play_join');
      } else throw request.status
    } catch (error) {
      alert('Invalid Session');
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      getQuestionRequest();
    }, questionData.timeLimit);
    return () => clearTimeout(timer);
  }, []);

  // Still have to create answer selection
  return <>
    { questionData }
  </>
}
PlayQuestion.propTypes = {
  playID: PropTypes.number
};
export default PlayQuestion;
