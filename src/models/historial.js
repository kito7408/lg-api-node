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

const Historial = connection.define('historial');

Historial.belongsTo(User,{
    foreignKey: false
});

connection.sync();

let historialModel = {};

historialModel.getAll = (callback) => {
    Historial.findAll({
        include: User
    }).then(historial => {
        callback(null,historial);
    })
}

module.exports = historialModel;