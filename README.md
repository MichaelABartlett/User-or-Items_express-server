# User-or-Items_express-server

This is a project example
this is a CRUD appliction

you need to be able to add stuff
you need to be able to edit (fix spelling mistake?)
you need to be able to mark something off
you need to be able to delete it
you need to be able to get the list 
you need to be able to get details about a single item on the list

// return just the bare-bones of all the items
GET /items


// return the details of a particulat item
GET /items/:id


// add a new item to the list
// provide information about the item that you want to add in the body
POST /items


// update the item with new info
// id in the path, is the id of the item update it with
PUT /items/:id

// or
// make sure the id and the information you want to update the item with are both in the body
PUT /items


// DELETE the item
// make sure to include the id in the path
DELETE /items/:id

*********************************************************
// * items to be sent back when sending a summry

// what do we want to track about our todo items?
// *id(number) - every item should have an id.
// *label/name(string) - the label of the item- this is what you will write down on a sheet of paper
// *done(boolean) - if true, then the task is done
// priority(string) - High Medium of Low
// dueDate (date) - the date this task is due



************************************************

how can the client send information along with the request

GET / users  -- returns the names and ids of all the users

app.get("/users", function(req, res){
    // code to return all the users
})

*****************************

GET /user/   --- returns the details of a single user
-- this is how you use it on the client side
GET /user/1
GET /user/2
GET /user/3

// path parameter
// this is how you code it on the server side
app.get("/user/:id", function(){
    // some code
})

********************************

PUT /user

**********************************

POST /user

***************************************

DELETE /user