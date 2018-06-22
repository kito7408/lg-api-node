const User = require('../models/user');

module.exports = function(app){

	app.get('/users', (req, res) => {
		User.getUsers((err, data) => {
			res.json(data);
		});
	});

	app.get('/users/:id', (req,res) => {
		User.findById(req.params.id, (err,data) => {
			res.json(data);
		})
	});

	app.post('/users',(req,res) => {
		const userData = {
			id: null,
			name: req.body.name,
			email: req.body.email,
			phone_number: req.body.phone_number,
			facebook: req.body.facebook
		};

		User.insertUser(userData, (err,data) => {
			if(data){
				res.json({
					success: true,
					msg: 'User Inserted',
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

	app.put('/users/:id',(req,res) => {

		const userData = {
			id: req.params.id,
			name: req.body.name,
			email: req.body.email,
			phone_number: req.body.phone_number,
			facebook: req.body.facebook
		};

		User.updateUser(userData, (err, data) => {
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

	app.delete('/users/:id', (req,res) => {
		User.deleteUser(req.params.id, (err, data) => {
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