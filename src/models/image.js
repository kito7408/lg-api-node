var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
});

const Image = connection.define('image',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	url: {
		type: Sequelize.TEXT,
		allowNull:false
	}
});

//connection.sync();

let imageModel = {};

imageModel.getImages = (callback) => {
	Image.findAll().then(images => {
		callback(null, images);
	});
};

imageModel.insertImage = (imageData, callback) => {
	Image.create({
		name: imageData.name,
		url: imageData.url,
		productId: imageData.productId
	}).then(result => {
		callback(null, result.get());
	});
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