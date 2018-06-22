var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
});

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

//connection.sync();

let userModel = {};

userModel.getUsers = (callback) => {
	User.findAll().then(users => {
		callback(null, users);
	});
};

userModel.insertUser = (userData, callback) => {
	User.create({
		name: userData.name,
		email: userData.email,
		phone_number: userData.phone_number,
		facebook: userData.facebook
	}).then(result => {
		callback(null, result.get());
	});
};

userModel.updateUser = (userData, callback) => {
	User.findById(userData.id).then(user => {
		user.updateAttributes({
			name: userData.name,
			email: userData.email,
			phone_number: userData.phone_number,
			facebook: userData.facebook
		}).then(result => callback(null,result.get()));
	});
};

userModel.deleteUser = (id, callback) => {
	User.findById(id).then(user => {
		user.destroy().then(result => callback(null,result.get()));
	});
};

userModel.findById = (id,callback) => {
	User.findById(id).then(user => {
		callback(null,user);
	});
}

module.exports = userModel;