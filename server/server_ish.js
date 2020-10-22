const Express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = 'mongodb://localhost:27017/';
const DATABASE_NAME = "like_db";
const COLLECTION_NAME ="likened";


const PORT = 9090;
//url =http://localhost:9090;

const app = Express();
var birds = require('./birds')
var database, collection; 
const  likenedrouter = require("./dBroute/likened_route.js") ;




var router = Express.Router();
//router = likenedrouter.setRouter(router);

//const  ish_likenedrouter = require("./dBroute/ish_likened_route.js") ;
app.use(cors())

app.use(function (req, res, next) {
    console.log('Time1:', Date.now())
    next()
  })
  // ...
  app.use(function (req, res, next) {
    console.log('Time2:', Date.now())
    next()
  })
app.use('/', birds)
app.get('/get', function (req, res) {
    console.log('GetTime:', Date.now())

    res.send('Hello Ish!')
  })
  
app.get('/ish', function (req, res) {
    res.send('Hello Pal!')
  })
app.post('/post', function (req, res) {
    res.send('post Ish')
  })
  app.delete('/delete', function (req, res) {
    res.send('delete ish')
  })
  app.put('/put', function (req, res) {
    res.send('put Ish')
  })
  
 // app.use('/idontlikeish',router); 
app.listen(PORT, async() => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    likenedrouter.setCollection(database);  //  <===
    likenedrouter.createCompoundIndex(database);  
        
        console.log(`Server-ish is running on port: ${PORT}`);
    });
  });