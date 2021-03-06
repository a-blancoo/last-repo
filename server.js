require('dotenv').config();
require ('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// gives server access to static files generated by running yarn build in client
app.use(express.static('./client/thoughts-react/build/'));

// mount routes
app.use('/api/thoughts/', require('./server/routes/thoughts-route'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/client/thoughts-react/build/' });
    });

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Wizardry happening on port ${PORT}`));