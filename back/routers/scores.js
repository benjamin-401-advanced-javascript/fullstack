
'use strict';

const express = require('express');

const router = express.Router();

const uuid = require('uuid/v4');


let scores = [
  { _id: '1', name: 'ben', score: '500' },
  { _id: '2', name: 'katie', score: '5' },
  { _id: '3', name: 'tristan', score: '1000' },
  { _id: '4', name: 'oliver', score: '666' },
]

router.get('/scores', (request, response) => {
  let result = scores.sort((a, b) => b.score - a.score);
  response.send(result);
});

router.post('/scores', (request, response) => {
  let newScore = request.body
  newScore._id = uuid();
  scores.push(newScore);
  response.send(newScore);
});

router.delete('/scores/:id', (request, response) => {
  scores = scores.filter(score => request.params.id !== score._id);
  response.send(scores);
});

router.get('/scores-bigger-than/:value', (request, response) => {
  let value = parseInt(request.params.value)
  let results = scores.filter(score => value < parseInt(score.score));
  response.send(results);
});


module.exports = router;