const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let colorModel = {};

colorModel.getColors = (callback) => {
	if(connection){
		connection.query('SELECT * FROM color ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

colorModel.insertColor = (colorData, callback) => {
	if(connection){
		connection.query('INSERT INTO color SET ?', colorData,
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

colorModel.updateColor = (colorData, callback) => {
	if(connection){
		const sql = 'UPDATE color SET '+
		'name = "' + colorData.name + 
		'" WHERE id = ' + colorData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					updatedId: colorData.id,
					msg: "Color Updated"
				});
			}
		})
	}
};

colorModel.deleteColor = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM color WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM color WHERE id = ' + id;
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

module.exports = colorModel;