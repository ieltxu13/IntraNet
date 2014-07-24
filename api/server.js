// ============================  BASE SETUP  ===================================

var express    = require('express');             // call express
    app        = express();                      // define our app using express
    bodyParser = require('body-parser'),
    http       = require('http'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    cors       = require('./config/cors'),
    database   = require('./config/database');

// ============================  CONFIGURATION  ================================

var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors.allowCrossDomain);

mongoose.connect(database.url, function(error) {
  if (error)
    throw error
  else
    console.log('mongo ok');
})

// ============================= ROUTES ========================================

var router = express.Router();
require('./routes/routes')(router);

router.use(function(req, res, next) {
  console.log('Something is happening.');         // do logging
  next();
});

app.use('/api', router);                          //prefix routes with /api

// ============================ START ==========================================
app.listen(port);
