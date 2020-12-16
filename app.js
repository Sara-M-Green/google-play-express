const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playStore-data')

app.get('/apps', (req, res) => {
    const sort = req.query.sort;
    const genre = req.query.genre;

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('We can only search by title or rank');
        }
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Must enter a valid genre');
        }
    }

    let results = apps

    if (sort) {
        results
          .sort((a, b) => {
              console.log(sort)
              console.log(a)
            return a[sort] > b[sort] ? 1 : -1;
        });
    }

    if (genre) {
        results = results.filter(app => 
          app.Genres.includes(genre));
    }

    res.json(results)
})

module.exports = app;