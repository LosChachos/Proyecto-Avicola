const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {createShed, getSheds, getShed, updateShed, deleteShed} = require("../../util/consultas");

router.get('/', async (req, res) => {
    const {id} = req.body;
    const rows = await db.query(getSheds, [id]);
    res.send(rows);
});

router.post('/add', async (req, res) => {
    const {id, shedNumber, width, length} = req.body;
    const shed = await db.query(getShed, [id, shedNumber]);
    if(shed.length == 0){
        await db.query(createShed, [shedNumber, width, length, id]);
        res.send(true)
    }else{
        res.send("Ya hay un galpon con ese numero de identificación")
    }
})

router.put('/update', async (req, res) => {
    const {id, shedNumber, width, length} = req.body;
    await db.query(updateShed, [shedNumber, width, length, id]);
    res.send(true);
})

router.delete('/delete', async (req, res) => {
    const {id} = req.body;
    await db.query(deleteShed, [id]);
    res.send(true);
})

module.exports = router;