const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {createFoodInventory, getFoodInventory} = require('../../util/consultas');

router.post('/add', async (req, res) => {
    
});


module.exports = router;