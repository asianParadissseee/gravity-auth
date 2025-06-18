const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', users);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
