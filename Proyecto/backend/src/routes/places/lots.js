const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {} = require("../../util/consultas");


router.get('/:id_farm/:id_shed/lots', async (req, res) => {
    const id = req.params.id_farm;
    const rows = await db.query(getSheds, [id]);
    res.send(rows);
});

router.post('/:id_farm/:id_shed/lots/add', async (req, res) => {
    const id = req.params.id_farm;
    const {shedNumber, width, length} = req.body;
    const shed = await db.query(getShed, [id, shedNumber]);
    if(shed.length == 0){
        await db.query(createShed, [shedNumber, width, length, id]);
        res.send(true)
    }else{
        res.send("Ya hay un galpon con ese numero de identificación")
    }
})

router.put('/:id_farm/:id_shed/lots/update', async (req, res) => {
    const id_farm = req.params.id_farm;
    const {id, shedNumber, width, length} = req.body;
    const shed = await db.query(getShed, [id_farm, shedNumber]);
    if(shed.length == 0){
        await db.query(updateShed, [shedNumber, width, length, id]);
        res.send(true);
    }else{
        res.send("Ya hay un galpon con ese numero de identificación")
    }
})

router.delete('/:id_farm/:id_shed/lots/delete', async (req, res) => {
    const {id} = req.body;
    await db.query(deleteShed, [id]);
    res.send(true);
})

module.exports = router;