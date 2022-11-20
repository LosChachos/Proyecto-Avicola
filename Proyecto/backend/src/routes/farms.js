const db = require('../util/database')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, granjas!');
});

router.post('/add', (req, res) => {
    console.log(req.body)
    res.send(req.body.email)
})

module.exports = router;