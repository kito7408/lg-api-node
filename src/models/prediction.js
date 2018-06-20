const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let predictionModel = {};

predictionModel.getPredictions = (callback) => {
	if(connection){
		connection.query('SELECT * FROM prediction ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

predictionModel.insertPrediction = (predictionData, callback) => {
	if(connection){
		connection.query('INSERT INTO prediction SET ?', predictionData,
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

predictionModel.updatePrediction = (predictionData, callback) => {
	if(connection){
		const sql = 'UPDATE prediction SET '+
		'beacon_id = "' + predictionData.beacon_id +
		'", user_id = "' + predictionData.user_id +
		'", product_id = "' + predictionData.product_id +
		'" WHERE id = ' + predictionData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					updatedId: predictionData.id,
					msg: "Prediction Updated"
				});
			}
		})
	}
};

predictionModel.deletePrediction = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM prediction WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM prediction WHERE id = ' + id;
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

module.exports = predictionModel;