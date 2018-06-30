var connection = require('./connection');

const Product = connection.Product;
const Category = connection.Category;
const Image = connection.Image;

let productModel = {};

productModel.getProducts = (callback) => {
	Product.findAll({
		include: [
			{ model: Category},
			{ model: Image}
		]
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

productModel.findById = (id,callback) => {
	Product.findById(id,{
		include: [
			{ model: Category},
			{ model: Image}
		]
	}).then(product => {
		callback(null,product);
	});
}

module.exports = productModel;