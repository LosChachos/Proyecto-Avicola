const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {createFood, searchFoodById, getFoods} = require('../../util/consultas');

router.post('/add', async (req, res)=>{
    const {id, name, mark } = req.body;
    const food = await db.query(searchFoodById, [id]);
    if(food.length > 0){
        res.send(false);
    }else{
        await db.query(createFood, [id, name, mark])
        res.send(true);
    }
})

router.get('/', async (req, res) => {
    const rows = await db.query(getFoods, [])
    rows.push(req.user.username);
    res.send(rows);
});

module.exports = router;