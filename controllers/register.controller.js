const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-shallow-27741',
        user: 'postgres',
        password: 'alao1996',
        database: 'smart_brain'
    }
});

const handleRegister = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'));
}


module.exports = {
    handleRegister: handleRegister
}