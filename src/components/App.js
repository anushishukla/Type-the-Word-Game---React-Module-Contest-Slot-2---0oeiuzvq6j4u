import React, { useState, useEffect } from 'react';
import "../styles/App.css"

const WORD_LIST = ['apple', 'banana', 'cherry', 'grape', 'orange'];

function App() {
  const [word, setWord] = useState('');
  const [flashWord, setFlashWord] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setWord(WORD_LIST[index]);
  }, []);

  useEffect(() => {
    let timeout;
    if (flashWord) {
      timeout = setTimeout(() => {
        setFlashWord(false);
      }, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [flashWord]);

  function handleInputChange(event) {
    setUserInput(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (userInput === word) {
      setResult('You won!');
    } else {
      setResult('You lost!');
    }
  }

  function handleRestartClick() {
    setUserInput('');
    setResult('');
    setFlashWord(true);

    let newIndex;
    if(index == WORD_LIST.length-1) newIndex = 0;
    else newIndex = index+1;

    setWord(WORD_LIST[newIndex]);
    setIndex(newIndex);
  }

  return (
    <div class="mini-game-container">
  <h2 class="mini-game-title">Mini Game</h2>
  {flashWord && <p class="mini-game-word">{word}</p>}
  {!result && !flashWord && (
    <form class="mini-game-form" onSubmit={handleFormSubmit}>
      <input class="mini-game-input" type="text" value={userInput} onChange={handleInputChange} />
      <button class="mini-game-button" type="submit">Check Answer</button>
    </form>
  )}
  {result && (
    <>
      <p class="mini-game-result">{result}</p>
      <button class="mini-game-restart-button" onClick={handleRestartClick}>Restart</button>
    </>
  )}
</div>

  );
}

export default App;
