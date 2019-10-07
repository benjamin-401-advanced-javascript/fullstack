import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = 'http://localhost:8080';

const App = () => {

  const [scores, setScores] = useState([]);
  const [nameInput, setNameInput] = useState([]);
  const [scoreInput, setScoreInput] = useState([]);


  useEffect(() => {
    fetch(`${API_URL}/scores`)
      .then((results) => results.json())
      .then((data) => setScores(data))
      .catch(console.log);
  }, []);

  // useEffect(() => {
  //   setScores(scores.sort((a, b) => b.score - a.score));
  // }, [scores]);

  const handleScoreDelete = (id) => (e) => {
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}/scores/${id}`, options)
      .then((results) => results.json())
      .then((data) => setScores(data))
      .catch(console.log);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      body: JSON.stringify({ name: nameInput, score: scoreInput }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    fetch(`${API_URL}/scores`, options)
      .then((results) => results.json())
      .then((data) => {
        let scoresArr = [...scores, data];
        setScores(scoresArr.sort((a, b) => b.score - a.score));
      });

  }

  const topScore = (id) => {
    if (!id)
      return <span>(TOP SCORE!) </span>
  }

  return (
    <>
      <h1>High Scores</h1>

      <ul>
        {scores.map((score, idx) => (
          <li key={idx}>
            {topScore(idx)}
            {score.name} - {score.score} points
          <button onClick={handleScoreDelete(score._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
        <input
            type="text"
            placeholder="Name: "
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </label>
        <label>
          Score:
        <input
            type="text"
            placeholder="Score: "
            value={scoreInput}
            onChange={(e) => setScoreInput(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>

    </>
  );
}

export default App;
