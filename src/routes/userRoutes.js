const User = require('../models/user');

module.exports = function(app){

	app.get('/users', (req, res) => {
		User.getUsers((err, data) => {
			res.json(data);
		});
	});

	app.post('/users',(req,res) => {
		const userData = {
			id: null,
			name: req.body.name,
			last_name: req.body.last_name
		};

		User.insertUser(userData, (err,data) => {
			if(data && data.insertId){
				res.json({
					success: true,
					msg: 'Usuario Inserted',
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
			last_name: req.body.last_name
		};

		User.updateUser(userData, (err, data) => {
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

	app.delete('/users/:id', (req,res) => {
		User.deleteUser(req.params.id, (err, data) => {
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