var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
});

let models = {};

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

const Category = connection.define('category',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT
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

const Prediction = connection.define('prediction');

const State = connection.define('state',{
    state: {
        type:Sequelize.BOOLEAN,
        allowNull: false
    }
});

Historial.belongsTo(User,{
    foreignKey: {
		allowNull: false
	}
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

State.belongsTo(User,{
    foreignKey: {
        allowNull: false
    }
});

State.belongsTo(Image, {
    foreignKey: {
        allowNull: false
    }
});

models.Beacon = Beacon;
models.Category = Category;
models.Historial = Historial;
models.User = User;
models.Image = Image;
models.Product = Product;
models.Prediction = Prediction;
models.State = State;

connection.sync();

module.exports = models;