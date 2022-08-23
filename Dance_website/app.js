const express = require("express");
const path = require("path");
const fs = require("fs");
// const bodyparser = require("body-parser")
const app = express();
const port = 8000;
const mongoose = require('mongoose');
// const mongoose = require('mongodb://localhost:27017/danceContact');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/danceContact');
}
// mongoose.connect('mongodb://localhost:27017/danceContact',{useNewUrlParser: true});
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
  });

const Contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('static')); // For serving static files
//app.use(express.urlencoded()); //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option 

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params)
})
app.get('/home', (req,res)=>{
    res.status(200).render('home.pug',)
})
app.get('/contact', (req,res)=>{1
    const params = { }

    res.status(200).render('contact.pug',params)
})
app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The items are saved on database")
    }).catch(()=>{
        res.send("The items are not saved on database")
    })
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
