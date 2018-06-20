const Image = require('../models/image');

module.exports = function(app){

    app.get('/images', (req, res) => {
		Image.getImages((err, data) => {
			res.json(data);
		});
    });
    
    app.post('/images',(req,res) => {
		const imageData = {
			id: null,
			name: req.body.name,
			url: req.body.url,
			product_id: req.body.product_id
		};

		Image.insertImage(imageData, (err,data) => {
			if(data && data.insertId){
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
			product_id: req.body.product_id
		};

		Image.updateImage(imageData, (err, data) => {
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
    
    app.delete('/images/:id', (req,res) => {
		Image.deleteImage(req.params.id, (err, data) => {
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