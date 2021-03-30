const express = require('express');
const knex = require('knex');

const app = express();

app.use(express.json());

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
    // user: 'postgres',
    // password: 'alao1996',
    // database: 'smart_brain'
  },
});

const handleGetProfile = (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({
      id: id,
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not Found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
};

module.exports = {
  handleGetProfile: handleGetProfile,
};
