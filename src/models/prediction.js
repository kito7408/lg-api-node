var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
});

const Prediction = connection.define('prediction');

const User = connection.define('user',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phone_number: {
		type: Sequelize.STRING,
		allowNull: false
	},
	facebook: {
		type: Sequelize.STRING,
		allowNull: false
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

const Beacon = connection.define('beacon',{
	uuid: {
		type: Sequelize.STRING,
		allowNull: false
	},
	major: Sequelize.STRING,
	minor: Sequelize.STRING,
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});

Product.belongsTo(Category,{
	foreignKey: {
		allowNull: false
	}
});

Product.hasMany(Image,{
	foreignKey: {
		allowNull: false
	}
});

Prediction.belongsTo(Product,{
	foreignKey: {
		allowNull: false
	}
});

Prediction.belongsTo(User,{
	foreignKey: {
		allowNull: false
	}
});

Prediction.belongsTo(Beacon,{
	foreignKey: {
		allowNull: false
	}
});

connection.sync();

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