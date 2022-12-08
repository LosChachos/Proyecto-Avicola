const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {getReportDailyFood, getReportFoodAll, getReportDailyWater, getReportWaterAll, getReportDailyDeath, getReportDeathAll, getReportDailyCosts, getReportCostsAll} = require("../../util/consultas");

router.get('/:id_farm/report/dailyFood', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportDailyFood, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/foodAll', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportFoodAll, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/dailyWater', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportDailyWater, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/waterAll', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportWaterAll, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/dailyDeath', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportDailyDeath, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/deathAll', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportDeathAll, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/dailyCost', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportDailyCosts, [initialDate, finalDate, id]);
    res.send(rows);
});

router.get('/:id_farm/report/costAll', async (req, res) => {
    const id = req.params.id_farm;
    const {initialDate, finalDate} = req.body;
    const rows = await db.query(getReportCostsAll, [initialDate, finalDate, id]);
    res.send(rows);
});

module.exports = router