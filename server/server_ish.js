const Express = require("express");
const cors = require("cors");


const PORT = 9090;
//url =http://localhost:9090;

const app = Express();
var birds = require('./birds')


var router = Express.Router();
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
app.listen(PORT, () => {
        
        console.log(`Server-ish is running on port: ${PORT}`);
    });
