const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {createFoodInventory, getFoodInventory, getLastFoodWarehouse, createFoodWarehouse, lastId, updateFoodWarehouse} = require('../../util/consultas');

router.post('/:id_farm/food_inventory/add', async (req, res) => {
    const {price, id_food, amount} = req.body;
    const id_farm = req.params.id_farm;
    const history = db.query(getLastFoodWarehouse, [id_food]);
    const id_user =  req.user.id;
    if (history.length  == 0){
        createNewFoodInventory(id_user, price, id_food, id_farm, amount);
    }else if(history[0].price == price) {
        await db.query(updateFoodWarehouse, [amount, id_user, history[0].id_food_inventory]);
    }else{
        createNewFoodInventory(id_user, price, id_food, id_farm, amount);
    }
    res.send(true);
});

async function createNewFoodInventory(id_user, price, id_food, id_farm, amount){
    await db.query(createFoodInventory, [price, id_food, id_farm]);
    const id_food_Inventory = (await db.query(lastId))[0].id;
    await db.query(createFoodWarehouse, [id_user, id_food_Inventory, amount]);
}

module.exports = router;