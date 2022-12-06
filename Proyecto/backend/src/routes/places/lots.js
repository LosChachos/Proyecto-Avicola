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
    const {race, amount_hens, lotNumber, dateOfBirth} = req.body;
    const lot = await db.query(getLot, [id_shed, lotNumber]);
    if(lot.length == 0){
        await db.query(createLot, [race, amount_hens, lotNumber, dateOfBirth, id_shed]);
        var id = (await db.query(lastId))[0].id;
        console.log(id);
        createVaccinationPlan(id, dateOfBirth);
        res.send(true)
    }else{
        res.send("Ya hay un lote con ese numero de identificación en este galpon")
    }
})

router.put('/:id_farm/:id_shed/lots/update', async (req, res) => {
    const id_shed = req.params.id_shed;
    const {id, race, amount_hens, lotNumber, dateOfBirth} = req.body;
    const lot = await db.query(getLot, [id_shed, lotNumber]);
    if(lot.length == 0 || (lot.length == 1 && id == lot[0].id)){
        await db.query(updateLot, [race, amount_hens, lotNumber, dateOfBirth, id]);
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

function createVaccinationPlan(id, dateOfBirth) {
    var currentDate = new Date(dateOfBirth);
    insertVaccinationDate(currentDate, sumDays(7, dateOfBirth), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(currentDate, sumDays(7, dateOfBirth), diseases[1], applicationMethod[0], id);
    insertVaccinationDate(sumDays(7, dateOfBirth), sumDays(14, dateOfBirth), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(7, dateOfBirth), sumDays(14, dateOfBirth), diseases[1], applicationMethod[0], id);
    insertVaccinationDate(sumDays(14, dateOfBirth), sumDays(21, dateOfBirth), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(14, dateOfBirth), sumDays(21, dateOfBirth), diseases[1], applicationMethod[0], id);
    insertVaccinationDate(sumDays(35, dateOfBirth), sumDays(42, dateOfBirth), diseases[3], applicationMethod[5], id);
    insertVaccinationDate(sumDays(35, dateOfBirth), sumDays(42, dateOfBirth), diseases[4], applicationMethod[3], id);
    insertVaccinationDate(sumDays(63, dateOfBirth), sumDays(70, dateOfBirth), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(77, dateOfBirth), sumDays(84, dateOfBirth), diseases[3], applicationMethod[5], id);
    insertVaccinationDate(sumDays(77, dateOfBirth), sumDays(84, dateOfBirth), diseases[4], applicationMethod[3], id);
    insertVaccinationDate(sumDays(91, dateOfBirth), sumDays(98, dateOfBirth), diseases[0], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[5]+", "+applicationMethod[4], id);
    insertVaccinationDate(sumDays(112, dateOfBirth), sumDays(119, dateOfBirth), diseases[5], applicationMethod[0]+", "+applicationMethod[1]+", "+applicationMethod[4], id);
}

function sumDays(days, dateOfBirth){
    var currentDate = new Date(dateOfBirth);
    currentDate.setDate(currentDate.getDate() + days );
    return currentDate;
}

async function insertVaccinationDate(initialDate, finalDate, illness, application_method, id_lot){
    var dateInitial = initialDate.getFullYear() + "-" + (initialDate.getMonth()+1) + "-" + initialDate.getDate();
    var dateFinal = finalDate.getFullYear() + "-" + (finalDate.getMonth()+1) + "-" + finalDate.getDate();
    await db.query(createVaccinationDate, [dateInitial, dateFinal, illness, application_method, id_lot]);
}

module.exports = router;