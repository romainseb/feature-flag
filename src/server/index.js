const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));

app.get('/api/v1/features', (req, res) => res.send({ overview: false, sharing: true }));

app.listen(18080, () => console.log('Listening on port 18080!'));
