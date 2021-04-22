import React from 'react';
import PropTypes from 'prop-types';

/* STUB */
function WaitingRoom (props) {
  /*
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
  */
  return <>
  <div className="waiting-room">
    <h1> Waiting Room </h1>
      <p>Good evening, care for some fineries while we wait? </p>
      <h2> Music </h2>
      <iframe
        width="90%"
        height="30%"
        src="https://drive.google.com/file/d/1E9gM4DgJh8oR33ocNltDjHjHP4I2GYie/preview?usp=sharing">
      </iframe>
      <h2> Tetris </h2>
      <iframe
      width="90%"
      height="400px"
      src="http://goodoldtetris.com/">
      </iframe>
      <h2> Fine Wine </h2>
      <iframe
      width="90%"
      height="400px"
      src="http://www.finewinemerchant.com.au/">
      </iframe>
  </div>
  </>
}
WaitingRoom.propTypes = {
  playID: PropTypes.number
};
export default WaitingRoom;
