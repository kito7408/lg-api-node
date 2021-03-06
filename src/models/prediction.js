var connection = require('./connection');

const Prediction = connection.Prediction;
const User = connection.User;
const Product = connection.Product;
const Category = connection.Category;
const Image = connection.Image;
const Beacon = connection.Beacon;

let predictionModel = {};

predictionModel.getPredictions = (callback) => {
	Prediction.findAll({
		include: [
			{ model: User},
			{ model: Beacon},
			{ model: Product,
			include: [
				{ model: Image },
				{ model: Category }
			]}
		]
	}).then(predictions => {
		callback(null, predictions);
	});
};

predictionModel.insertPrediction = (predictionData, callback) => {
	Prediction.create({
		userId: predictionData.userId,
		beaconId: predictionData.beaconId,
		productId: predictionData.productId
	}).then(result => {
		predictionModel.findById(result.get().id, (err,data) => {
			callback(null, data);
		});
	});
};

predictionModel.updatePrediction = (predictionData, callback) => {
	Prediction.findById(predictionData.id).then(prediction => {
		prediction.updateAttributes({
			userId: predictionData.userId,
			beaconId: predictionData.beaconId,
			productId: predictionData.productId
		}).then(result => {
			predictionModel.findById(result.get().id, (err,data) => {
				callback(null, data);
			});
		});
	});
};

predictionModel.deletePrediction = (id, callback) => {
	Prediction.findById(id).then(prediction => {
		prediction.destroy().then(result => callback(null,result.get()));
	});
};

predictionModel.findById = (id,callback) => {
	Prediction.findById(id,{
		include: [
			{ model: User},
			{ model: Beacon},
			{ model: Product,
			include: [
				{ model: Image },
				{ model: Category }
			]}
		]
	}).then(prediction => {
		callback(null,prediction);
	});
}

module.exports = predictionModel;