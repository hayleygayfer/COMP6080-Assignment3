import React from 'react';
import '../App.css'

function SetTimer (setTime) {
  const [isFinished, setIsFinished] = React.useState(false);
  const time = setTime.input;
  const [countdown, setCountdown] = React.useState(time / 1000);
  localStorage.setItem('questionFinished', isFinished);

  React.useEffect(() => {
    console.log('timing');
    const timer = setTimeout(() => {
      setIsFinished(true);
      console.log('Timing!');
      setCountdown(countdown - 1);
      localStorage.setItem('questionFinished', isFinished);
    }, time);
    return () => clearTimeout(timer);
  }, []);

  return (<>
    <p>Timer is running!: {countdown}</p>
  </>);
}

export default SetTimer;
