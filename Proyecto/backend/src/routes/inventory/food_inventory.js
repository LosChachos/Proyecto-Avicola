const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {createFood} = require('../../util/consultas');

router.post('/add_food', async (req, res)=>{
    console.log(req.user);
    res.send(req.user.username);
})



module.exports = router;