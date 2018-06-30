var connection = require('./connection');

const Image = connection.Image;
const Product = connection.Product;

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