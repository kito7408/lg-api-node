const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let categoryModel = {};

categoryModel.getCategories = (callback) => {
    if(connection){
		connection.query('SELECT * FROM category ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

categoryModel.insertCategory = (categoryData, callback) => {
	if(connection){
		connection.query('INSERT INTO category SET ?', categoryData,
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

categoryModel.updateCategory = (categoryData, callback) => {
	if(connection){
		const sql = 'UPDATE category SET '+
		'name = "' + categoryData.name +
		'" WHERE id = ' + categoryData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
                    updatedId: categoryData.id,
					msg: "Category Updated"
				});
			}
		})
	}
};

categoryModel.deleteCategory = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM category WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM category WHERE id = ' + id;
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

module.exports = categoryModel;