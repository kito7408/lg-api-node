var connection = require('./connection');

const Historial = connection.Historial;
const User = connection.User;

let historialModel = {};

historialModel.getAll = (callback) => {
    Historial.findAll({
        include: User
    }).then(historial => {
        callback(null,historial);
    })
}

module.exports = historialModel;