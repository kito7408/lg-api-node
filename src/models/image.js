const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let imageModel = {};

imageModel.getImages = (callback) => {
	if(connection){
		connection.query('SELECT * FROM image ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

imageModel.insertImage = (imageData, callback) => {
	if(connection){
		connection.query('INSERT INTO image SET ?', imageData,
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

imageModel.updateImage = (imageData, callback) => {
	if(connection){
		const sql = 'UPDATE image SET '+
		'name = "' + imageData.name +
		'", url = "' + imageData.url +
		'", product_id = "' + imageData.product_id +
		'" WHERE id = ' + imageData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					updatedId: imageData.id,
					msg: "Image Updated"
				});
			}
		})
	}
};

imageModel.deleteImage = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM image WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM image WHERE id = ' + id;
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

module.exports = imageModel;