const Prediction = require('../models/prediction');

module.exports = function(app){

    app.get('/predictions', (req, res) => {
		Prediction.getPredictions((err, data) => {
			res.json(data);
		});
    });
    
    app.post('/predictions',(req,res) => {
		const predictionData = {
			id: null,
			beacon_id: req.body.beacon_id,
			product_id: req.body.product_id,
			user_id: req.body.user_id
		};

		Prediction.insertPrediction(predictionData, (err,data) => {
			if(data && data.insertId){
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
			beacon_id: req.body.beacon_id,
			product_id: req.body.product_id,
			user_id: req.body.user_id
		};

		Prediction.updatePrediction(predictionData, (err, data) => {
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
    
    app.delete('/predictions/:id', (req,res) => {
		Prediction.deletePrediction(req.params.id, (err, data) => {
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