const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let userModel = {};

userModel.getUsers = (callback) => {
	if(connection){
		connection.query('SELECT * FROM users ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

userModel.insertUser = (userData, callback) => {
	if(connection){
		connection.query('INSERT INTO users SET ?', userData,
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

userModel.updateUser = (userData, callback) => {
	if(connection){
		const sql = 'UPDATE users SET '+
		'name = "' + userData.name +
		'", last_name = "' + userData.last_name +
		'" WHERE id = ' + userData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					updatedId: userData.id,
					msg: "User Updated"
				});
			}
		})
	}
};

userModel.deleteUser = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM users WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM users WHERE id = ' + id;
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

module.exports = userModel;