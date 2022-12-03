const db = require('../../util/database')
const express = require('express');
const router = express.Router();
const {getLots, getLot, createLot, updateLot, deleteLot, lastId, createVaccinationDate, deleteCosts, deleteVaccinationDate, deleteDailyReports, deleteWeightHistory} = require("../../util/consultas");
const diseases = ["Newcastle", "Gumboro", "Bronquitis Infecciosa", "Coriza", "Viruela", "Salmonella"];
const applicationMethod = ["Agua de bebida", "Spray", "Gota ocular", "Puncion alar", "Inyeccion intramuscular", "Inyeccion subcutanea"];


router.get('/:id_farm/:id_shed/lots', async (req, res) => {
    const id_shed = req.params.id_shed;
    const rows = await db.query(getLots, [id_shed]);
    res.send(rows);
});

router.post('/:id_farm/:id_shed/lots/add', async (req, res) => {
    const id_shed = req.params.id_shed;
    const {race, amount_hens, lotNumber} = req.body;
    const lot = await db.query(getLot, [id_shed, lotNumber]);
    if(lot.length == 0){
        await db.query(createLot, [race, amount_hens, lotNumber, id_shed]);
        var id = (await db.query(lastId))[0].id;
        console.log(id);
        createVaccinationPlan(id);
        res.send(true)
    }else{
        res.send("Ya hay un lote con ese numero de identificación en este galpon")
    }
})

router.put('/:id_farm/:id_shed/lots/update', async (req, res) => {
    const id_shed = req.params.id_shed;
    const {id, race, amount_hens, lotNumber} = req.body;
    const lot = await db.query(getLot, [id_shed, lotNumber]);
    if(lot.length == 0 || (lot.length == 1 && id == lot[0].id)){
        await db.query(updateLot, [race, amount_hens, lotNumber, id]);
        res.send(true);
    }else{
        res.send("Ya hay un lote con ese numero de identificación en este galpon")
    }
})

router.delete('/:id_farm/:id_shed/lots/delete', async (req, res) => {
    const {id} = req.body;
    await db.query(deleteCosts, [id]);
    await db.query(deleteVaccinationDate, [id]);
    await db.query(deleteDailyReports, [id]);
    await db.query(deleteWeightHistory, [id]);
    await db.query(deleteLot, [id]);
    res.send(true);
})

function createVaccinationPlan(id) {
    var currentDate = new Date(Date.now());
    insertVaccinationDate(currentDate, sumDays(7), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(currentDate, sumDays(7), diseases[1], applicationMethod[0], id);
    insertVaccinationDate(sumDays(7), sumDays(14), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(7), sumDays(14), diseases[1], applicationMethod[0], id);
    insertVaccinationDate(sumDays(14), sumDays(21), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(14), sumDays(21), diseases[1], applicationMethod[0], id);
    insertVaccinationDate(sumDays(35), sumDays(42), diseases[3], applicationMethod[5], id);
    insertVaccinationDate(sumDays(35), sumDays(42), diseases[4], applicationMethod[3], id);
    insertVaccinationDate(sumDays(63), sumDays(70), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(77), sumDays(84), diseases[3], applicationMethod[5], id);
    insertVaccinationDate(sumDays(77), sumDays(84), diseases[4], applicationMethod[3], id);
    insertVaccinationDate(sumDays(91), sumDays(98), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(112), sumDays(119), diseases[5], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[4], id);
}

function sumDays(days){
    var currentDate = new Date(Date.now());
    currentDate.setDate(currentDate.getDate() + days );
    return currentDate;
}

async function insertVaccinationDate(initialDate, finalDate, illness, application_method, id_lot){
    var dateInitial = initialDate.getFullYear() + "-" + (initialDate.getMonth()+1) + "-" + initialDate.getDate();
    var dateFinal = finalDate.getFullYear() + "-" + (finalDate.getMonth()+1) + "-" + finalDate.getDate();
    await db.query(createVaccinationDate, [dateInitial, dateFinal, illness, application_method, id_lot]);
}

module.exports = router;