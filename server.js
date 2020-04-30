const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const JsonDB = require('node-json-db').JsonDB;
const JsonDBConfig = require('node-json-db/dist/lib/JsonDBConfig').Config;
const config = require('./config.json');

// init server
const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json()); // enable support of JSON-encoded bodies
app.use(cors({origin: '*'})); // add CORS headers

// init db
const db = new JsonDB(new JsonDBConfig('database', true));

/**
 * Home url
 */
app.get('/', (req, res) => {
    res.send('Validate product backend works!');
});

/**
 * Signup user API
 */
app.post('/signup', [
    check('project').isLength({ min: 1 }),
    check('email').isEmail()
], (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // save user
    const user = {
        email: req.body.email,
        created_at: moment().format('LLL'),
        ip: req.ip
    };
    db.push(`/${req.body.project}/users[]`, user);
    res.send('Success');
});

/**
 * Create action API
 */
app.post('/action', [
    check('project').isLength({ min: 1 }),
    check('action').isLength({ min: 1 }),
], (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // save action
    const action = {
        action: req.body.action,
        created_at: moment().format('LLL'),
        ip: req.ip
    };
    db.push(`/${req.body.project}/actions[]`, action);
    res.send('Success');
});

// run server only if it is called by node, we need this 'module.parent' 
// for server tests not to rerun server on refreshing mocks
if(!module.parent) {
    app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
    });    
}

module.exports = app;
