const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

//settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//routes
require('./routes/userRoutes')(app);
require('./routes/categoryRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/imageRoutes')(app);
require('./routes/beaconRoutes')(app);
require('./routes/predictionRoutes')(app);
require('./routes/stateRoutes')(app);
require('./routes/historialRoutes')(app);


app.listen(app.get('port'), () => {
	console.log('server on port 3000');
});