const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const{getNextInventory, addFoodConsumed, addEatingHistory, getEatingHistory, updateEatingHistory} = require('../../util/consultas');

router.get('/:id_farm/eating_history/:id_lot', async (req, res) => {
    const rows = await db.query(getEatingHistory, [req.params.id_lot]);
    res.send(rows);
}); 

router.put('/:id_farm/eating_history/', async (req, res) => {
    const {amount, id_history} = req.body;
    await db.query(updateEatingHistory, [amount, id_history]);
    res.send(true);
}); 

router.post('/:id_farm/eating_history/:id_lot/add', async (req, res) => {
    let {id_food, amount} = req.body;
    let food_inventory =  (await db.query(getNextInventory, [id_food]))[0];
    while(amount > food_inventory.amount - food_inventory.consumed ){
        const applyed =  food_inventory.amount - food_inventory.consumed;
        amount -= applyed;
        addEatingHistoryFunc(req.params.id_lot, food_inventory.id, applyed);
        addFoodConsumedFunc(food_inventory.id);
        //console.log(await db.query("SELECT * FROM food_inventory WHERE id_food = 2222 ORDER BY id"));
        console.log(food_inventory);
        food_inventory =  (await db.query(getNextInventory, [id_food]))[0];
        //console.log("amount: "+amount+", consumed: "+ consumed);
        console.log(food_inventory);
        //console.log("\n");
    }
    if(amount>0){
        addEatingHistoryFunc(req.params.id_lot, food_inventory.id, amount);
        addFoodConsumedFunc(food_inventory.id);
    } 
    res.send(true);
}); 

async function addEatingHistoryFunc(id_lot, id_food_inventory, applyed) {
    const add = await db.query(addEatingHistory, [id_lot, id_food_inventory, applyed]);
}
/* async function addFoodConsumedFunc(id_food_inventory) {
    const set = await db.query(addFoodConsumed, [id_food_inventory, id_food_inventory]);
} */

module.exports = router;