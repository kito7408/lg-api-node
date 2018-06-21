const Category = require('../models/category');

module.exports = function(app){

    app.get('/categories', (req, res) => {
        Category.getCategories((err, data) => {
            res.json(data);
        });
    });
    
    app.post('/categories',(req,res) => {
		const categoryData = {
			id: null,
			name: req.body.name,
			description: req.body.description
		};

		Category.insertCategory(categoryData, (err,data) => {
			if(data){
				res.json({
					success: true,
					msg: 'Category Inserted',
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
    
    app.put('/categories/:id',(req,res) => {

		const categoryData = {
			id: req.params.id,
			name: req.body.name,
			description: req.body.description
		};

		Category.updateCategory(categoryData, (err, data) => {
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
    
    app.delete('/categories/:id', (req,res) => {
		Category.deleteCategory(req.params.id, (err, data) => {
			if(data) {
				res.json({
					success: true,
					dataDeleted: data
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