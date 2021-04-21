import React from 'react';
import '../App.css';
import API from '../api.js';
const api = new API('http://localhost:5000');

function CreateGame () {
  const [nameInput, setNameInput] = React.useState('');
  const [newQuizId, setNewQuizId] = React.useState('');
  const [gameJSON, setGameJSON] = React.useState('');
  const token = localStorage.getItem('token');

  // File handling
  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);

  // File submission
  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  const uploadFile = () => {
    if (isFilePicked === false) return 1;

    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(selectedFile);
  }

  function onReaderLoad (event) {
    console.log(event.target.result);
    setGameJSON(event.target.result);
  }

  /* CREATE NEW GAME SERVER REQUEST */
  const createGameRequest = async () => {
    try {
      // if name = '', throw error
      if (nameInput === '') {
        throw Error('Name can\'t be empty');
      }
      const request = await api.makeAPIRequest('admin/quiz/new', token, 'POST', '', {
        name: nameInput,
      });
      if (request.status === 200) {
        console.log('Game Created');
        // send them to dashboard
        request.json().then((data) => {
          setNewQuizId(data.quizId)
          console.log(newQuizId);
          if (gameJSON !== '') {
            if (validateGameJSON(gameJSON) === false) {
              alert('File does not match valid JSON game data structure');
            }
            loadGameDataRequest(newQuizId);
          }
        });
        alert(`Game Created! id: ${newQuizId}`);
        setNameInput('');
      } else throw request.status
    } catch (error) {
      setNameInput('');
      alert(`Invalid New Quiz Request: ${error}`);
      console.log(error);
    }
  }

  const validateGameJSON = (gameData) => {
    let game = {};
    try {
      game = JSON.parse(gameData);
    } catch (error) {
      alert(error);
      console.log(error);
      return false;
    }

    if (!game.questions) return false;
    for (let i = 0; i < game.questions.length; i++) {
      if (!game.questions[i].questionType) return false;
      if (!game.questions[i].questionString) return false;
      if (!game.questions[i].timeLimit) return false;
      if (!game.questions[i].pointValue) return false;
      if (!game.questions[i].mediaSource) return false;
      if (!game.questions[i].answers) return false;
      if (!game.questions[i].correctAnswers) return false;
    }
    if (!game.name) return false;
    if (!game.thumbnail) return false;

    return true;
  }

  const loadGameDataRequest = async (quizId) => {
    try {
      const request = await api.makeAPIRequest(`admin/quiz/${quizId}`, token, 'PUT', '', gameJSON);
      console.log(request);
      if (request) {
        console.log('Loaded Game data');
      }
    } catch (error) {
      alert(`Invalid Load Data Request: ${error}`);
      console.log(error);
    }
  }

  return (<>
    <div>
      Game name:
      <input
        type="text"
        onChange={e => setNameInput(e.target.value)}
        value={nameInput}
      /><br/>
      Upload Game Data JSON File (optional):<br/>
      <input type="file" name="file" onChange={selectFile} />
      { isFilePicked
        ? (<div>
              <p>Filename: {selectedFile.name}</p>
              <p>FileType: {selectedFile.type}</p>
            </div>
          )
        : (
            <p>Select a file to show details</p>
          )
      }
    <div>
      <button onClick={uploadFile}>Submit</button>
    </div>
    <button className='button smallButton' onClick={createGameRequest}> Create New Quiz </button>
    </div>
  </>)
}

export default CreateGame;
