const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { generateResponse } = require('./controllers/app.js');
const { history } = require('./controllers/app.js');

dotenv.config();

const app = express();

//middleware to parse the body content to JSON format
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hello Interns!!");
});

app.post('/generate', generateResponse);
app.get('/generate', (req, res) => {
    res.send(history);
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


