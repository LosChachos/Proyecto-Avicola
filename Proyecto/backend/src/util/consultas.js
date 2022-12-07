const consultas = {
    loginUser: "SELECT * FROM users WHERE username = ?",
    loginId: "SELECT * FROM users WHERE id = ?",
    insertPerson: "INSERT INTO persons (id, name, lastname, email, phone) VALUES (?,?,?,?,?)",
    insertUser: "INSERT INTO users (username, password, user_type, id_person) VALUES (?,?,?,?)",
    getFarms: "Select id, name from farms f join users_farms u on f.id = u.id_farm where u.id_user = ?",
    createFarm: "INSERT INTO farms (name) VALUES (?)",
    lastIdLot: "Select id from lots order by id DESC limit 1",
    createUserFarm: "INSERT INTO users_farms (id_user, id_farm, date) VALUES (?,?,DATE(NOW()))",
    updateFarm: "UPDATE farms SET name = ? WHERE id = ?",
    deleteFarm: "DELETE FROM farms WHERE id = ?",
    deleteUserFarm: "DELETE FROM users_farms WHERE id_farm = ?",
    createShed: "INSERT INTO sheds (shedNumber, width, length, id_farm) VALUES (?,?,?,?)",
    getSheds: "Select id, shedNumber, width, length, coalesce(( select sum(amount_hens) from sheds s join lots l on s.id = l.id_shed group by id_shed having id_shed = id),0) as amount_hens from sheds where id_farm = ?",
    getShed: "Select * from sheds where id_farm = ? and shedNumber = ?",
    updateShed: "UPDATE sheds SET shedNumber = ?, width = ?, length = ? WHERE id = ?",
    deleteShed: "DELETE FROM sheds WHERE id = ?",
    createDailyReport: "INSERT INTO daily_reports (date, numberOfDeaths, waterConsumption, id_lot) VALUES (DATE(NOW()),?,?,?)",
    getDailyReports: "SELECT * FROM daily_reports WHERE id_lot = ? ",
    verifyDateReport: "SELECT * FROM daily_reports WHERE daily_reports.date = DATE(now()) AND id_lot = ?",
    updateConsumption: "UPDATE daily_reports SET waterConsumption = (waterConsumption+?) WHERE id_lot = ?  AND daily_reports.date = DATE(now())",
    updateDeaths: "UPDATE daily_reports SET numberOfDeaths = (numberOfDeaths+?) WHERE id_lot = ?  AND daily_reports.date = DATE(now()) ",
    createFood: "INSERT INTO foods (id, name, mark) VALUES (?, ?, ?)",
    searchFoodById: "SELECT * FROM foods WHERE id = ?",
    getFoods: "SELECT * FROM foods",
    createFoodInventory: "INSERT INTO food_inventory (id, price, id_food) VALUES (?, ?, ?)",
    getFoodInventory: "SELECT * FROM food_inventory WHERE id = ?",
    getAllLots: "Select l.id, lotNumber, dateOfBirth, shedNumber, amount_hens, race from lots l join sheds s on l.id_shed = s.id",
    getLots: "Select * from lots where id_shed = ?",
    getLot: "Select * from lots where id_shed = ? and lotNumber = ?",
    createLot: "INSERT INTO lots (race, amount_hens, lotNumber, dateOfBirth, id_shed) VALUES (?,?,?,?,?)",
    updateLot: "UPDATE lots SET race = ?, amount_hens = ?, lotNumber = ?, dateOfBirth = ? WHERE id = ?",
    deleteLot: "DELETE FROM lots WHERE id = ?",
    createVaccinationDate: "INSERT INTO vaccination_date (initialDate, finalDate, illness, application_method, id_lot) VALUES (?, ?, ?, ?, ?)",
    getCosts: "Select * from costs where id_lot = ?",
    getCost: "Select * from costs where id_cost = ?",
    createCost: "INSERT INTO costs (description, price, date, id_lot) VALUES (?,?,?,?)",
    updateCost: "UPDATE costs SET description = ?, price = ?, date = ? WHERE id = ?",
    deleteCost: "DELETE FROM costs WHERE id = ?",
    deleteCosts: "DELETE FROM costs WHERE id_lot = ?",
    deleteVaccinationDate: "DELETE FROM vaccination_date WHERE id_lot = ?",
    deleteDailyReports: "DELETE FROM daily_reports WHERE id_lot = ?",
    deleteWeightHistory: "DELETE FROM weight_history WHERE id_lot = ?",
    getAllUsernames: "SELECT username from users"
};

module.exports = consultas;