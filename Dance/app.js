const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});

const port = 8000;

// defining mongoose schemas
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    text: String
  });

  var Contact= mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFFr
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{ 
    var MyData = new Contact(req.body);
    MyData.save().then(()=>{
        res.send("This item haas been send to the database!")
    }).catch(()=>{
        res.status(400).send("Item is not send to the database")
    })  
})
// app.post('/', (req, res)=>{ 
//     Name = req.body.name
//     age = req.body.age
//     email = req.body.email
//     phone = req.body.number
//     more = req.body.text
//     let output_to_write = ` The name of candidate is: ${Name}, Age is: ${age}, Email: ${email}, Phone no.: ${phone}, more about candidate is: ${more}`
//     fs.writeFileSync('output.txt', output_to_write)
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

