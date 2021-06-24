const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
require('./models/model-schemas');
const routes = require('./routes');

let config;
if(process.env.NODE_ENV === 'test') {
    config = require('./config/testing.json');
} else {
    config = require('./config/dev.json');
}

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, function (err, db) {
    if (db) {
        console.log(config.databaseName + ' - Database connection established successfully!');
    }
});

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use('/', routes);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports = app; // for testing
