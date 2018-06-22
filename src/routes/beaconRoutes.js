const Beacon = require('../models/beacon');

module.exports = function(app){

    app.get('/beacons', (req, res) => {
		Beacon.getBeacons((err, data) => {
			res.json(data);
		});
	});
	
	app.get('/beacons/:id', (req,res) => {
		Beacon.findById(req.params.id, (err,data) => {
			res.json(data);
		})
	});
    
    app.post('/beacons',(req,res) => {
		const beaconData = {
			id: null,
			uuid: req.body.uuid,
			major: req.body.major,
			minor: req.body.minor,
			active: req.body.active
		};

		Beacon.insertBeacon(beaconData, (err,data) => {
			if(data){
				res.json({
					success: true,
					msg: 'Beacon Inserted',
					data: data
				})
			}else{
				res.status(500).json({
					success: false,
					msg: 'Error'
				})
			}
		})
    });
    
    app.put('/beacons/:id',(req,res) => {

		const beaconData = {
			id: req.params.id,
			uuid: req.body.uuid,
			major: req.body.major,
			minor: req.body.minor,
			active: req.body.active
		};

		Beacon.updateBeacon(beaconData, (err, data) => {
			if(data){
				res.json({
					success: true,
					data: data
				});
			}else{
				res.json({
					success: false,
					msg: 'error'
				})
			}
		})
    });
    
    app.delete('/beacons/:id', (req,res) => {
		Beacon.deleteBeacon(req.params.id, (err, data) => {
			if(data) {
				res.json({
					success: true,
					dataDeleted: data
				})
			}else{
				res.json({
					success: false,
					msg: 'Error'
				})
			}
		})
	});
}