const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {getFarms, createFarm, lastId, createUserFarm, updateFarm, deleteFarm, deleteUserFarm} = require("../../util/consultas");

router.get('/:email/farms', async (req, res) => {
    const email = req.params.email;
    const rows = await db.query(getFarms, [email]);
    res.send(rows);
});

router.post('/add', async (req, res) => {
    const id = req.user.id;
    const {name} = req.body;
    await db.query(createFarm, [name]);
    const id_farm = (await db.query(lastId))[0].id;
    console.log(id_farm);
    await db.query(createUserFarm, [id, id_farm]);
    res.send(true)
})

router.put('/update', async (req, res) => {
    const id = req.user.id;
    const {name} = req.body;
    await db.query(updateFarm, [name, id]);
    res.send(true);
})

router.delete('/delete', async (req, res) => {
    const id = req.user.id;
    await db.query(deleteUserFarm, [id]);
    await db.query(deleteFarm, [id]);
    res.send(true);
})

module.exports = router;