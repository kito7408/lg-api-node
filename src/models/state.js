var connection = require('./connection');

const State = connection.State;
const User = connection.User;
const Image = connection.Image;
const Historial = connection.Historial;

let stateModel = {};

stateModel.getFirst = (callback) => {
    State.findById(1, {
        include: [
            { model: User },
            { model: Image}
        ]
    }).then(state => {
        callback(null, state);
    });
};

stateModel.updateState = (stateData, callback) => {
    if(stateData.state){
        Historial.create({
            userId: stateData.userId
        });
    }
    State.findById(1).then(state => {
        state.updateAttributes({
            userId: stateData.userId,
            state: stateData.state,
            imageId: stateData.imageId
        }).then(result => {
            stateModel.getFirst((err,data) => {
                callback(null,data);
            });
        });
    });
};

/*stateModel.insertState = (stateData, callback) => {
    State.create({
        userId: stateData.userId,
        imageId: stateData.imageId,
        state: stateData.state
    }).then(result => {
        stateModel.getFirst((err,data) => {
            callback(null,data);
        });
    });
};*/

module.exports = stateModel;