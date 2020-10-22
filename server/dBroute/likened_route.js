//const express = require('express')
var  router ;
//= express.Router()
const COLLECTION_NAME  = "Likened";
var collection =  ""
////// db.collection.createIndex( <key and index type specification>, { unique: true } )

const  setCollection = (db) =>{collection = db.collection(COLLECTION_NAME);}
 //collection.createIndex({ likedby: 1 ,likeditem:1}, { unique: true });
 //   console.log(`Index created: `);
    var createCompoundIndex = function(db) {
      // Get the documents collection
      var collection = db.collection('Likened');
      // Create the index
      collection.createIndex(
        { likedby : 1, likeditem : 1  },{unique:true} ,function(err, result) {
        console.log(result);
        //callback(result);
      });
    };

//const  routeme = (router)=> {
//setCollection(coll);
const  setRouter = (router) =>{ 

//router.route("/Dress/:id").put((request, response)=>
router.route("/like/:id/:user").post((request, response)=>  

 { 
  const id = request.params.id;
  const user = request.params.user ;
  var ldoc = {};
  ldoc['likedby'] = user
  ldoc['likeditem'] = id;
 
  
  collection.insert(ldoc, (error, result) => {
            
          if(error) {
              return response.status(529).send(error);
          }
          response.send(result);
      });
  });
  router.route("/check/:id/:user").get((request, response)=>  

  { 
   const id = request.params.id;
   const user = request.params.user ;
   var ldoc = {};
   ldoc['likedby'] = user
   ldoc['likeditem'] = id;
  
   
   collection.findOne(ldoc, (error, result) => {
             
           if(error) {
               return response.status(579).send(error);
           }
           response.send(result);
       });
   });
 
 
 
 
router.route("/unlike/:id/:user").post((request, response)=>  
 {
    const id = request.params.id;
    const user = request.params.user ;
    var ldoc = {};
    ldoc['likedby'] = user
    ldoc['likeditem'] = id;
    collection.deleteOne(ldoc, (error, result) => {
            
      if(error) {
          return response.status(539).send(error);
      }
      if(result.deletedCount == 0) {
        return response.status(599).send(error);
    }
    
      response.send(result);
  });
}); 


  return router ;
 }
 //exports.setRouter  = setRouter
  
//exports.routeme = router;
exports.setCollection = setCollection
exports.createCompoundIndex =  createCompoundIndex
