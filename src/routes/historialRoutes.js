const Historial = require('../models/historial');

module.exports = function(app){

    app.get('/historial', (req,res) => {
        Historial.getAll((err, data) => {
            res.json(data);
        });
    });

}