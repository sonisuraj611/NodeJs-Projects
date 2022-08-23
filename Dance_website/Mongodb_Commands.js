//Initial or basic commands
show dbs 
//To swtich to soni db
use soni
//Tables in RDBMS = collections in MongoDb
show collections
//Inserting Data in mongo db
db.items.insertOne({name: "samsung", price: "25000",rating: "4.1", units: "300",sold: "200"})
db.items.insertOne({name: "Realme", price: "15000",rating: "4.1", units: "300",sold: "200"})
//To insert multiple documents
db.items.insertMany([{name: "samsung", price: "25000",rating: "4.1", units: "300",sold: "200"},{name: "Realme", price: "15000",rating: "4.4", units: "270",sold: "250"},{name: "moto", price: "30000",rating: "3.9", units: "150",sold: "600"}])


//Searching data in mongo db
// db.collectionName.find()-->To find all the documents of db
db.items.find({units: "300"}) // This query will return all the objects with units equal to 300

db.items.find({units: {$lt: "300"}})

//And operator
db.items.find({units: {$lt: "300"}, price: {$gte: "15000"}})
//or
db.items.find({$or: [{units: {$lt: "300"}}, {price: {$gte: "15000"}}]})
db.items.find({$or: [{units: {$lt: "270"}}, {price: {$gt: "15000"}}]})

db.items.find({units: {$lt: "300"}} , {sold: 1})


// Deleting items from the Mongo Database
// deleteOne will delete the matching document entry and will delete the first entry in case of multi document match
db.items.deleteOne({price: 15000})
//deleteMany will delete all matching entries
db.items.deleteMany({price: 129000})

 

//Updating item elements in Mongo db entries
//To update One entry
db.items.updateOne({name: "Realme"} , {$set: {price: "17000"}})

//To update many entries + many elements
db.items.updateMany({name: "Realme"} , {$set: {price: "16000", rating: "4.2"}})
