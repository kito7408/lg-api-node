var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
});

const Category = connection.define('category',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT
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
})

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

Product.belongsTo(Category);
Product.hasMany(Image);

//connection.sync({force: true});

let productModel = {};

productModel.getProducts = (callback) => {
	Product.findAll({
		include: Category,Image
	}).then(products => {
		callback(null, products);
	});
};

productModel.insertProduct = (productData, callback) => {
	Product.create({
		name: productData.name,
		size: productData.size,
		description: productData.description,
		categoryId: productData.categoryId,
		color: productData.color
	}).then(result => {
		callback(null, result.get());
	});
};

productModel.updateProduct = (productData, callback) => {
	Product.findById(productData.id).then(product => {
		product.updateAttributes({
			name: productData.name,
			size: productData.size,
			description: productData.description,
			categoryId: productData.categoryId,
			color: productData.color
		}).then(result => callback(null,result.get()));
	});
};

productModel.deleteProduct = (id, callback) => {
	Product.findById(id).then(product => {
		product.destroy().then(result => callback(null,result.get()));
	});
};

module.exports = productModel;