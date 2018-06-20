const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testapimysql'
})

let productModel = {};

productModel.getProducts = (callback) => {
	if(connection){
		connection.query('SELECT * FROM product ORDER BY id',
			(err, rows) => {
				if(err){
					throw err;
				}else{
					callback(null, rows);
				}
			})
	}
};

productModel.insertProduct = (productData, callback) => {
	if(connection){
		connection.query('INSERT INTO product SET ?', productData,
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

productModel.updateProduct = (productData, callback) => {
	if(connection){
		const sql = 'UPDATE product SET '+
		'name = "' + productData.name +
		'", size = "' + productData.size +
		'", description = "' + productData.description +
		'", category_id = "' + productData.category_id +
		'", color_id = "' + productData.color_id +
		'" WHERE id = ' + productData.id;

		connection.query(sql, (err,result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					updatedId: productData.id,
					msg: "Product Updated"
				});
			}
		})
	}
};

productModel.deleteProduct = (id, callback) => {
	if(connection){
		let sql = 'SELECT * FROM product WHERE id = ' + id;

		connection.query(sql, (err, row) => {
			if(row){
				let sql = 'DELETE FROM product WHERE id = ' + id;
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

module.exports = productModel;