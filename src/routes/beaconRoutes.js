const Beacon = require('../models/beacon');

module.exports = function(app){

    app.get('/beacons', (req, res) => {
		Beacon.getBeacons((err, data) => {
			res.json(data);
		});
    });
    
    app.post('/beacons',(req,res) => {
		const beaconData = {
			id: null,
			uuid: req.body.uuid,
			major: req.body.major,
			minor: req.body.minor,
			activo: req.body.activo
		};

		Beacon.insertBeacon(beaconData, (err,data) => {
			if(data && data.insertId){
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
			activo: req.body.activo
		};

		Beacon.updateBeacon(beaconData, (err, data) => {
			if(data && data.msg){
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
			if(data && data.msg == 'deleted' || data.msg == 'not exist') {
				res.json({
					success: true,
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
}