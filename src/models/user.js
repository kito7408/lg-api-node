var connection = require('./connection');

const User = connection.User;

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