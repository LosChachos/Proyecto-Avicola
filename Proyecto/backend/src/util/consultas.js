const consultas = {
    loginUser: "SELECT * FROM users WHERE username = ?",
    loginId: "SELECT * FROM users WHERE id = ?",
    insertPerson: "INSERT INTO persons SET ?",
    insertUser: "INSERT INTO users SET ?",
    getFarms: "Select id, name from farms f join users_farms u on f.id = u.id_farm where u.id_user = ?",
    createFarm: "INSERT INTO farms (name) VALUES (?)",
    lastId: "Select last_insert_id() as id",
    createUserFarm: "INSERT INTO users_farms (id_user, id_farm, date) VALUES (?,?,DATE(NOW()))",
    updateFarm: "UPDATE farms SET name = ? WHERE id = ?",
    deleteFarm: "DELETE FROM farms WHERE id = ?",
    deleteUserFarm: "DELETE FROM users_farms WHERE id_farm = ?",
    createShed: "INSERT INTO sheds (shedNumber, width, length, id_farm) VALUES (?,?,?,?)",
    getSheds: "Select * from sheds where id_farm = ?",
    getShed: "Select * from sheds where id_farm = ? and shedNumber = ?",
    updateShed: "UPDATE sheds SET shedNumber = ?, width = ?, length = ? WHERE id = ?",
    deleteShed: "DELETE FROM sheds WHERE id = ?",
    createDailyReport: "INSERT INTO daily_reports (date, numberOfDeaths, waterConsumption, id_lot) VALUES (DATE(NOW()),?,?,?)",
    getDailyReports: "SELECT * FROM daily_reports WHERE id_lot = ? ",
    verifyDateReport: "SELECT * FROM daily_reports WHERE daily_reports.date = DATE(now()) AND id_lot = ?",
    updateConsumption: "UPDATE daily_reports SET waterConsumption = ? WHERE id_lot = ?  AND daily_reports.date = DATE(now())",
    updateDeaths: "UPDATE daily_reports SET numberOfDeaths = ? WHERE id_lot = ?  AND daily_reports.date = DATE(now()) "
};

module.exports = consultas;