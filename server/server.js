var express = require('express');
var bodyParser = require('body-parser');

var morgan = require('morgan');
var session = require('express-session');
var cors = require('cors')

var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);

var app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1/nodeDB");
var db = mongoose.connection ;

var humanSchema = new mongoose.Schema({
    email : String,
    password : String,
    username : String
});
var commentSchema = new mongoose.Schema({
    user: String,
    text: String,
    like: Number
})


var humanModel = mongoose.model("human", humanSchema);
var commentModel = mongoose.model("comment", commentSchema);


// var person = new humanModel({
//     name: "azadeh",
//     age: 25,
//     username: "aziafra"
// });
//
// person.save(function(err, person){
//     if(err) {throw err}
//     console.log(person);
// });
//
// console.log(person);
// console.log(person.name);


db.on("error", function(){
    console.log("oh oh...!");
});
db.once("connected", function(){
    console.log("DB umad!");
});


app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: db})
}));

app.use(morgan('common'));
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// var users = {
//     arash:"123",
//     azadeh:"1234",
//     sara:"12345"
// };
//
// var comments = {
//     "azadeh": ["salam"],
//     "sara": ["khoobi"],
//     "sahel": ["chetori?"]
// };

app.get("/", function(req, res, next){
    console.log(req.session);
    console.log(req.session.auth);
    console.log(Boolean(req.session.auth));
    res.sendFile(__dirname + "/static/html/home.html");
});

app.post("/login", function(req,res,next){
/*    for(user in users){
        if(req.body['username'] == user){
            if(req.body['password'] == users[user]){
                req.session.auth = { username: req.body['username']}
                res.json({status: 'true' , msg: 'login shodi!'}) ;
                return;
            }
            else{
                res.json({status:'false', msg:'pass ghalat!'})
                return;
            }
        }
    }
    res.json({status:'false', msg:'user yaft nashod'});*/
    // console.log(req.body);
    if(req.session.auth){
            res.json({status: false, msg: "to ke login budi!!"});
    }
    else {
        humanModel.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                throw err
            }
            console.log(user);
            if (user) {
                if (user.password == req.body.password) {
                    req.session.auth = {username: req.body['username']};
                    res.json({status: true, msg: 'login shodi!', user: req.session.auth.username});
                }
                else {
                    res.json({status: false, msg: 'pass ghalat!'})
                }
            }
            else {
                res.json({status: false, msg: 'user yaft nashod'});
            }
        })
    }
});

app.post("/logout", function(req,res,next){
    delete req.session.auth;
    // req.session.auth = {};
    res.json({status: true, msg: "logout shodi!", user: "unKnown"});
});

app.post("/signup", function(req,res,next){
    var formData = req.body;

    console.log(formData);

    if( formData.username.length && formData.password.length ){
        if(formData.password.length >= 4){
            humanModel.find({username: formData.username} , function(err, users){
                if(err) throw err;
                else if(users.length){
                    res.json({status: false, msg: "user tekrarie!"});
                }
                else{
                   var newUser = new humanModel({
                       email: formData.email || "",
                       username: formData.username,
                       password: formData.password
                   });
                    // console.log(newUser);
                    newUser.save();
                    res.json({status: true, msg: "avariiin!"});
                }
            })
        }
        else{
            res.json({status: false, msg: "pass ro kam zadi!"});
        }
    }
    else{
        res.json({status: false, msg: "username ya pass nadariii!"});
    }
    // if(req.body.userName.length && req.body.passWord.length >= 4){
    //     users[req.body.userName] = req.body.passWord;
    //     res.json({status:true, msg:'sabtenam shodi ba passe' + users[req.body.userName]});
    //     console.log(users);
    // }
    // else{
    //     res.json({status:'false', msg:'amaliate sabtenam anjam nashod'});
    // }
});

app.post("/submitComment", function(req, res, next){
    if(req.session.auth.username != undefined){
        commentModel.create({
            user : req.session.auth.username,
            text: req.body.comment,
            like: 0
        }, function(err, comment){
            if(err){throw err}
                console.log(comment);
                res.json({status : true, msg : "msg sabt shod!"});
        });
    }
    else{
        res.json({status : false, msg : "to ke login nistiii!!"});
    }
})

app.post("/getComments", function(req, res, next){
    commentModel.find({} , function(err, comments){
        if(err){throw err}
        else{
            res.json(comments);
        }
    })
})

app.post("/getInfo", function(req,res,next){
    // res.json(req.session.auth) ;
    if(req.session.auth){
        res.json({status: req.session.auth.username})
    }
    else{
        res.json({status: false})
    }
});



app.listen(8000);
console.log("app running on port 8000");