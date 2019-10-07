
const express = require('express');
const app = express();

const cors = require('cors');

const scoreRouter = require('./routers/scores')

app.use(cors());
app.use(express.json());


app.use(scoreRouter);

app.listen(8080, () => console.log(`Listening on 8080`));
