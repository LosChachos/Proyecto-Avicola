const consultas = {
    loginUser: "SELECT * FROM users WHERE username = ?",
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
    deleteShed: "DELETE FROM sheds WHERE id = ?"
};

module.exports = consultas;