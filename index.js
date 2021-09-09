// import the express module

const express = require("express");

// instantiate an applilcation server
const app = express();

// add support to parsing json in the body
app.use(express.json());

// define the port that this application is listening on
const PORT = 4000;

let nextId = 3;

// this is where the data is stored
let db = [{
    "id":1,
    "label": "Call Mom!",
    "dueDate": "yesterday",
    "done": false,
    "priority": "High"
},{
    "id":2,
    "label": "Buy Dad a Beer!",
    "dueDate": "yesterday",
    "done": false,
    "priority": "High"
}]

/**
 * GET     /
 * GET     /items
 * GET     /items/:id
 * POST    /items       body{}
 * PUT     /items/:id   body{}
 * DELETE  /items/:id
 */

// returns some banner info - used for a sanity check
app.get("/", function(req, res){
    res.json("Best ToDo App, This is all that should display");
})

// GET /items
// returns  the basic info for all the items
app.get("/items", function(req, res){
    console.log("GET /items");
    // exersize for the home work,
    // use .map() higher order function
    // to convert every item in the db array
    // to a simpler copy that only has the id, lable and done

    let simplifiedDB = db.map(function(item, index){
        // write the code, that will 
        // convert item (with all its details),
        // to a simpler copy (with just the id, lable, and done)
        //console.log("item: ",item)
        let newThing = {'id':item.id,'label':item.label,'done':item.done}

        //let remove = delete item.dueDate; delete item.priority;
        return newThing
    });
    //simplifiedDB = db
    //res.json(db) // this returns the entire data base, 
                    // use when testing if you have not figured out how to simplify list of items
    res.json(simplifiedDB)
})


// GET /item/:id
// return the entire item matching the id
app.get("/items/:id", function(req, res){
    console.log("GET /items/:id", req.params);

    let theID = req.params.id; // params is the info that the client sent in the request
    // want to get one of the item from the array(db)
    // and return it fully (ie no transformation)

    // loop thru the db array and find the correct item
    // and return it

    // you can use a higer order find() function (ie> db.find())

    //let found = null; // fill this in
    console.log('what is this',theID)
    let found = db.find(function(item, index){
        if(item.id == theID)

        return true
    })
    console.log('found: ', found)
    res.json(found);
    //res.json(db)
})



// POST    /items       body{lable (required), extra attributes are stored with the item}
// label is required
// if id is send, we are going to replace it
// if any other attribute is sent, we will accept it as additional info
// if done is sent at true, we will accept it, otherwise we will set it to false

// this is adding a new item to the array, that is a object in our case here
app.post("/items", function(req,res){
    console.log("POST /items", req.body);

    let dataIn = req.body;
    // need to find a way to come up with a new id
    
    let newId = nextId; // need to find a way to come up with a new id
    nextId ++;

    // if they sent an id, overwrite it.
    dataIn.id = newId;

    // label has to be in the request
    if(!dataIn.label){
        // this code will execute if lable is falsey
        // have to decide what to do?
        // send 400 if no lable sent
        res.status(400).send("Label required"); // use .send when you want to send a message
        return;
    }
    console.log("done: ",dataIn.done)
    // if they send in anything other than 'true' for the done flag
    // we mark the item as not done (ie set done flag to false)
    if(dataIn.done != 'true'){
        dataIn.done = false;
    }
    console.log("done: ",dataIn.done)
    // we add this to the db
    db.push(dataIn);
    res.sendStatus(204); // use .sendStatus when only sending the code
})


// PUT /items/:id body{}
// if an id is included in the body, replace it with the id that is passed in on the path param
// should look like the POST 
// this should update an existing item from our db
app.put("/items/:id", function(req, res){
    console.log("Put /items/:id", req.body);
    // your code here
    
    let dataIn = req.body;
    
    // if they sent an id, overwrite it with path params id
    dataIn.id = req.params.id;

    objindex = db.findIndex((obj => obj.id == dataIn.id));
    db[objindex] = dataIn;
    // label has to be in the request
     if(!dataIn.label){
         // this code will execute if lable is falsey
         // have to decide what to do?
         // send 400 if no lable sent
         res.status(400).send("Label required"); // use .send when you want to send a message
         return;
     }


    // if they send in anything other than 'true' for the done flag
    // we mark the item as not done (ie set done flag to false)
    if(dataIn.done != 'true'){
        dataIn.done = false;
    }
    console.log("done: ",dataIn.done)
    // we add this to the db
    res.sendStatus(204); // use .sendStatus when only sending the code

})


// DELTE /items/:id
// find the item with the id in the db, and remove it
app.delete("/items/:id", function(req, res){
    //console.log("DELETE /items/:id", req.body)
    let theID = req.params.id; // this is the id that is getting requested to be deleted
    console.log("theID: ", theID)

    console.log("item to be deleted: ",db[theID-1])
    let toDelete = db.findIndex(x => x.id == theID)
    console.log("this is toDelete: ", toDelete )

    db.splice(toDelete,1)
    res.sendStatus(204); // use .sendStatus when only sending the code
})


// // this the the old way that really does not work
// // DELTE /items/:id
// // find the item with the id in the db, and remove it
// app.delete("/items/:id", function(req, res){
//     //console.log("DELETE /items/:id", req.body)
//     let theID = req.params.id;
//     console.log("item to be deleted: ",db[theID-1])
//     db.splice(theID-1,1)
//     res.sendStatus(204); // use .sendStatus when only sending the code
// })


// start the application server
app.listen(PORT, function(){
    console.log("App starting, listening on port", PORT);
})


// use instead of postman
// curl -X GET localhost:4000/