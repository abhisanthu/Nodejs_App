// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var mongojs = require('mongojs');
var db = mongojs('Orders', ['category']);  //  using mongojs module coonnect nodejs and mongodb , where orders is db name and category is the collection name
 
// Configuration
//mongoose.connect('mongodb://localhost/Orders');

console.log("connected");

 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");   // allow cross origin doamin
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
  app.get('/categoryDetail', function (req, res) {

     db.category.find().sort({              // return all all reocords present in category collection of orders db in descending order sorting(-1)
      _id: -1
    }, function (err, doc) {
      res.json(doc);
      console.log(doc);
    })
  })

  app.delete('/categoryDelete:categoryid', function (req, res) {


    var categoryid = req.params.categoryid;  // categoryid is have value objectid of cliked record
    console.log(categoryid);

    db.category.remove({
      _id: mongojs.ObjectId(categoryid)   // in category collection where object id == categoryid delete that record from that collection
    }, function (err, doc) {
      res.json(doc);             // send that json type of response to client side(angualr)
      console.log(doc);   // print response got by nodejs from mongodb category collection

    })

  })
   

 
// listen (start app with node server.js) ======================================

var port=8080;
app.listen(port);  // pass port value to listen method of express reference
console.log("Server Running  on port  " + port);   // nodejs server running port 