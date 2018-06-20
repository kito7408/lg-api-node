const Color = require('../models/color');

module.exports = function(app) {

    app.get('/colors', (req, res) => {
		Color.getColors((err, data) => {
			res.json(data);
		});
	});

    app.post('/colors',(req,res) => {
		const colorData = {
			id: null,
			name: req.body.name
		};

		Color.insertColor(colorData, (err,data) => {
			if(data && data.insertId){
				res.json({
					success: true,
					msg: 'Color Inserted',
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

    app.put('/colors/:id',(req,res) => {

		const colorData = {
			id: req.params.id,
			name: req.body.name
		};

		Color.updateColor(colorData, (err, data) => {
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
    
    app.delete('/colors/:id', (req,res) => {
		Color.deleteColor(req.params.id, (err, data) => {
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