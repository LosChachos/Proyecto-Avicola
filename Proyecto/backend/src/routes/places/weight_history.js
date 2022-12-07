const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const { getWeight, createWeight, updateWeight, deleteWeight} = require("../../util/consultas");

router.get('/:id_farm/weight', async (req, res) => {
    const {id} = req.body;
    const rows = await db.query(getWeight, [id]);
    res.send(rows);
});

router.post('/:id_farm/weight/add', async (req, res) => {
    const {weight, id_lot} = req.body;
    await db.query(createWeight, [weight, id_lot]);
    res.send(true);
})

router.put('/:id_farm/weight/update', async (req, res) => {
    const {weight, id} = req.body;
    await db.query(updateWeight, [weight, id]);
    res.send(true);
})

router.delete('/:id_farm/weight/delete', async (req, res) => {
    const {id} = req.body;
    await db.query(deleteWeight, [id]);
    res.send(true);
})

module.exports = router;