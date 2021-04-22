import React from 'react';
import '../App.css'
import API from '../api.js';
const api = new API('http://localhost:5005');

function GameDelete (gameId) {
  const deleteRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.makeAPIRequest('admin/quiz/' + gameId.input, token, 'DELETE', '', '');
    } catch (error) {
    }
  }
  deleteRequest();
  return <>
    <h2> Game has been deleted </h2>
    { // LINK TO results (parameterised on the session ID)
      // localStorage.setItem('token', data.token);
    }
  </>;
}

export default GameDelete;
