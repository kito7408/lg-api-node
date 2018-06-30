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

const Product = connection.define('product',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	size: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT,
	color: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Category = connection.define('category',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT
});

Product.belongsTo(Category,{
	foreignKey: {
		allowNull: false
	}
});

Image.belongsTo(Product,{
	foreignKey: {
		allowNull: false
	}
});

connection.sync();

let imageModel = {};

imageModel.getImages = (callback) => {
	Image.findAll({
		include: Product
	}).then(images => {
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
	Image.findById(imageData.id).then(image => {
		image.updateAttributes({
			name: imageData.name,
			url: imageData.url,
			productId: imageData.productId
		}).then(result => callback(null,result.get()));
	});
};

imageModel.deleteImage = (id, callback) => {
	Image.findById(id).then(image => {
		image.destroy().then(result => callback(null,result.get()));
	});
};

imageModel.findById = (id,callback) => {
	Image.findById(id,{
		include: Product
	}).then(image => {
		callback(null,image);
	});
}

module.exports = imageModel;