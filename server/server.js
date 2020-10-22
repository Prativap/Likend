const Express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


//var express = require('express');

//var router = Express.Router();
const  likenedrouter = require("./dBroute/likened_route.js") ;


//var router = Express.Router();
 

const CONNECTION_URL = 'mongodb://localhost:27017/';
const DATABASE_NAME = "like_db";
const COLLECTION_NAME ="likened";
const PORT = 8080;

const app = Express();

//router = dressrouter.setRouter(router);
//router = likenedrouter.setRouter(router);
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));


var database, collection; 

//----------------Connect to DB--------------------------
 
app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        likenedrouter.setCollection(database);  //  <===
        likenedrouter.createCompoundIndex(database);  
       // collection = database.collection(COLLECTION_NAME);

        
          app.use('/like', likenedrouter); 
          app.use('/unlike', likenedrouter); 
          app.use('/check', likenedrouter);
          app.use('/', likenedrouter); 
        console.log(`Server is running on port: ${PORT}`);
        console.log(`Connected to DB: ${DATABASE_NAME} collection: ${COLLECTION_NAME} `);
    });
});
 