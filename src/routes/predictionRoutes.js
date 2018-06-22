const Prediction = require('../models/prediction');

module.exports = function(app){

    app.get('/predictions', (req, res) => {
		Prediction.getPredictions((err, data) => {
			res.json(data);
		});
	});
	
	app.get('/predictions/:id', (req,res) => {
		Prediction.findById(req.params.id, (err,data) => {
			res.json(data);
		})
	});
    
    app.post('/predictions',(req,res) => {
		const predictionData = {
			id: null,
			beaconId: req.body.beaconId,
			productId: req.body.productId,
			userId: req.body.userId
		};

		Prediction.insertPrediction(predictionData, (err,data) => {
			if(data){
				res.json({
					success: true,
					msg: 'Prediction Inserted',
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
    
    app.put('/predictions/:id',(req,res) => {

		const predictionData = {
			id: req.params.id,
			beaconId: req.body.beaconId,
			productId: req.body.productId,
			userId: req.body.userId
		};

		Prediction.updatePrediction(predictionData, (err, data) => {
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
    
    app.delete('/predictions/:id', (req,res) => {
		Prediction.deletePrediction(req.params.id, (err, data) => {
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