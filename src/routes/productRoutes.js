const Product = require('../models/product');

module.exports = function(app){

    app.get('/products', (req, res) => {
		Product.getProducts((err, data) => {
			res.json(data);
		});
	});
	
	app.get('/products/:id', (req,res) => {
		Product.findById(req.params.id, (err,data) => {
			res.json(data);
		})
	});
    
    app.post('/products',(req,res) => {
		const productData = {
			id: null,
			name: req.body.name,
			size: req.body.size,
			description: req.body.description,
			categoryId: req.body.categoryId,
			color: req.body.color
		};

		Product.insertProduct(productData, (err,data) => {
			if(data){
				res.json({
					success: true,
					msg: 'Product Inserted',
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
    
    app.put('/products/:id',(req,res) => {

		const productData = {
			id: req.params.id,
			name: req.body.name,
			size: req.body.size,
			description: req.body.description,
			categoryId: req.body.categoryId,
			color: req.body.color
		};

		Product.updateProduct(productData, (err, data) => {
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
    
    app.delete('/products/:id', (req,res) => {
		Product.deleteProduct(req.params.id, (err, data) => {
			if(data) {
				res.json({
					success: true,
					data: data
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