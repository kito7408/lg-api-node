const Image = require('../models/image');

module.exports = function(app){

    app.get('/images', (req, res) => {
		Image.getImages((err, data) => {
			res.json(data);
		});
    });
	
	app.get('/images/:id', (req,res) => {
		Image.findById(req.params.id, (err,data) => {
			res.json(data);
		})
	});
	
    app.post('/images',(req,res) => {
		const imageData = {
			id: null,
			name: req.body.name,
			url: req.body.url,
			productId: req.body.productId
		};

		Image.insertImage(imageData, (err,data) => {
			if(data){
				res.json({
					success: true,
					msg: 'Image Inserted',
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
    
    app.put('/images/:id',(req,res) => {

		const imageData = {
			id: req.params.id,
			name: req.body.name,
			url: req.body.url,
			productId: req.body.productId
		};

		Image.updateImage(imageData, (err, data) => {
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
    
    app.delete('/images/:id', (req,res) => {
		Image.deleteImage(req.params.id, (err, data) => {
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