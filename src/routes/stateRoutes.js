const State = require('../models/state');

module.exports = function(app){

    app.get('/state', (req,res) => {
        State.getFirst((err,data) => {
            res.json(data);
        });
    });

    app.put('/state',(req,res) => {

        const stateData = {
            userId: req.body.userId,
            state: req.body.state,
            imageId: req.body.imageId
        };

        State.updateState(stateData, (err, data) => {
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

    })

    /*app.post('/state',(req,res) => {
        const stateData = {
            userId: req.body.userId,
            state: req.body.state,
            imageId: req.body.imageId
        };

        State.insertState(stateData, (err,data) => {
            if(data){
				res.json({
					success: true,
					msg: 'State Inserted',
					data: data
				})
			}else{
				res.json({
					success: false,
					msg: 'Error'
				})
			}
        })
    })*/
}