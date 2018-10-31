var express = require("express");
var bodyParser = require("body-parser")
var ejs = require("ejs")
var mongoose = require('mongoose');
var path = require('path')
var app = express();
//Connect mongoose to MongoDB
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://khawarb:M.K876bhatti@ds233323.mlab.com:33323/freecodecamp",{useNewUrlParser : true})

//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//set View engin
app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"));

// MongoDB
var Schema = mongoose.Schema;


//Set the Schema
var UserSchema = new Schema({
original_url : String,
short_url : { type: Number, required: true, unique: true}
})


//Model using it 
var User = mongoose.model('User',UserSchema );




 
  
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.get("/:cost",(req,res)=>{
    User.find({short_url : req.params.cost},(err,user)=>{
            /*res.json({
                original_url : user[0].original_url
            })*/
           let loc = 'https://'+ user[0].original_url
            console.log(loc)
            res.redirect(loc);
            
    }) 
 
})
app.post("/api/sht",(req,res)=>{
  // add urls
  var url = new User({
    original_url : req.body.original_url,
    short_url : req.body.counter
})
url.save((err)=>{
    if(err){
        throw err
    }
    else
    {
        console.log('Success')
    }
})
})
app.listen(3000,()=>{
    console.log("Server Started")
})