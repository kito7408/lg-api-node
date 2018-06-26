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

const State = connection.define('state',{
    state: {
        type:Sequelize.BOOLEAN,
        allowNull: false
    }
});

const Historial = connection.define('historial');

Historial.belongsTo(User,{
    foreignKey: false
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
})

//connection.sync();

let stateModel = {};

stateModel.getFirst = (callback) => {
    State.findById(1, {
        include: [
            { model: User },
            { model: Image}
        ]
    }).then(state => {
        callback(null, state);
    });
};

stateModel.updateState = (stateData, callback) => {
    if(stateData.state){
        Historial.create({
            userId: stateData.userId
        });
    }
    State.findById(1).then(state => {
        state.updateAttributes({
            userId: stateData.userId,
            state: stateData.state,
            imageId: stateData.imageId
        }).then(result => {
            stateModel.getFirst((err,data) => {
                callback(null,data);
            });
        });
    });
};

/*stateModel.insertState = (stateData, callback) => {
    State.create({
        userId: stateData.userId,
        imageId: stateData.imageId,
        state: stateData.state
    }).then(result => {
        stateModel.getFirst((err,data) => {
            callback(null,data);
        });
    });
};*/

module.exports = stateModel;