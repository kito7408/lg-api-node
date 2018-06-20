const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let beaconModel = {};

beaconModel.getBeacons = (callback) => {
	if(connection){
		connection.query('SELECT * FROM beacon ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

beaconModel.insertBeacon = (beaconData, callback) => {
	if(connection){
		connection.query('INSERT INTO beacon SET ?', beaconData,
			(err, result) => {
				if(err){
					throw err;
				}else{
					callback(null, {
						'insertId': result.insertId
					})
				}
			})
	}
};

beaconModel.updateBeacon = (beaconData, callback) => {
	if(connection){
		const sql = 'UPDATE beacon SET '+
		'uuid = "' + beaconData.uuid +
		'", major = "' + beaconData.major +
		'", minor = "' + beaconData.minor +
		'", activo = "' + beaconData.activo +
		'" WHERE id = ' + beaconData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					updatedId: beaconData.id,
					msg: "Beacon Updated"
				});
			}
		})
	}
};

beaconModel.deleteBeacon = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM beacon WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM beacon WHERE id = ' + id;
				connection.query(sql, (err, result) => {
					if(err){
						throw err;
					}else{
						callback(null, {
                            deletedId: id,
							msg: 'deleted'
						})
					}
				})
			}else{
				callback(null, {
					msg: 'not exist'
				})
			}
		})
	}
};

module.exports = beaconModel;