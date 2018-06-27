var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
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

connection.sync();

let beaconModel = {};

beaconModel.getBeacons = (callback) => {
	Beacon.findAll().then(beacons => {
		callback(null, beacons);
	});
};

beaconModel.insertBeacon = (beaconData, callback) => {
	Beacon.create({
		uuid: beaconData.uuid,
		major: beaconData.major,
		minor: beaconData.minor,
		active: beaconData.active
	}).then(result => {
		callback(null, result.get());
	});
};

beaconModel.updateBeacon = (beaconData, callback) => {
	Beacon.findById(beaconData.id).then(beacon => {
		beacon.updateAttributes({
			uuid: beaconData.uuid,
			major: beaconData.major,
			minor: beaconData.minor,
			active: beaconData.active
		}).then(result => callback(null,result.get()));
	});
};

beaconModel.deleteBeacon = (id, callback) => {
	Beacon.findById(id).then(beacon => {
		beacon.destroy().then(result => callback(null,result.get()));
	});
};

beaconModel.findById = (id,callback) => {
	Beacon.findById(id).then(beacon => {
		callback(null,beacon);
	});
}

module.exports = beaconModel;