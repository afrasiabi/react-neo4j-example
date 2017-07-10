var express = require('express');
var bodyParser = require('body-parser');
var neo4j = require('neo4j');
var cors = require('cors')
var uuid = require('uuid/v4')

var db = new neo4j.GraphDatabase('http://neo4j:neo4@localhost:7474');

var morgan = require('morgan');

var session = {};

var app = express();
app.use(cors());

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/login", function(req,res,next){
    if(req.body.token && session[req.body.token]){
        res.json({status: false, msg: "to ke login budi!!"});
    }
    else {
        var findUser = "MATCH (n:Users {username: {nameParam}}) RETURN n.password as password";
        var userData = {
            nameParam: req.body.username
        }

        callbackUser = function(err, user){
            if (err) {
                throw err
            }
            // console.log("hellooo");
            if (user.length !== 0){
                // console.log(user);
                if (user[0].password === req.body.password) {
                    // console.log(user.password);
                    var token = uuid();
                    session[token] = {username: req.body.username};

                    res.json({status: true, msg: 'login shodi!', user: req.body.username, token: token});
                }
                else {
                    res.json({status: false, msg: 'pass ghalat!'})
                }
            }
            else {
                res.json({status: false, msg: 'user yaft nashod'});
            }
        }

        db.cypher({ query: findUser, params: userData}, callbackUser);
    }
});

app.post("/logout", function(req,res,next){
    delete session[req.body.token];
    res.json({status: true, msg: "logout shodi!", user: "unknown"});
});

app.post("/signup", function(req,res,next){
    var formData = req.body;
    console.log(formData);
    if( formData.username.length && formData.signupPass.length !== undefined){
        if(formData.signupPass.length >= 4){
            var existingUserQuery = "MATCH (n:Users {username: {nameParam}}) RETURN n ";

            var userData = {
                nameParam: formData.username
            }

            callbackExistingUser = function(err, users) {
                if (users.length === 0) {
                    var insertQuery = "MERGE (p1:Users {email: {email}, username: {username}, password: {password}}) RETURN p1";
                    var newUser = {
                        email: formData.email || "",
                        username: formData.username,
                        password: formData.signupPass
                    }

                    callbackInsert = function(err, data) {
                        console.log(data);
                        res.json({status: true, msg: "avariiin!", data: data});
                    };
                    db.cypher({ query: insertQuery, params: newUser}, callbackInsert);

                } else {
                    res.json({status: false, msg: "user tekrarie!"});
                }
            };
            db.cypher({ query: existingUserQuery, params: userData}, callbackExistingUser);
        }
        else{
            res.json({status: false, msg: "pass ro kam zadi!"});
        }
    }
    else{
        res.json({status: false, msg: "username ya pass nadariii!"});
    }

});

app.post("/submitComment", function(req, res, next){

    // console.log(req.session)
    // console.log(req.body.username)

    if(req.body.token && session[req.body.token]){
        var insertComment = "MATCH (p2:Users {username: {username}}) CREATE (p2) - [r:TELL] -> (p3:Comments {text: {text}}) RETURN p2.username as username,p3.text as text,ID(p3) as id";
        var newComment = {
            username: session[req.body.token].username,
            text: req.body.comment
        }
        callbackInsertComment = function (err, comment) {
          console.log(comment);
            if (err) {
                throw err
            }
            // console.log(comment);
            res.json({status: true, msg: "msg sabt shod!"});
        }
        db.cypher({query: insertComment, params: newComment}, callbackInsertComment);
        return;
    }
    else{
        // console.log(req.session.auth);
        res.json({status : false, msg : "to ke login nistiii!!"});
    }
})

app.post("/getComments", function(req, res, next){
  console.log(req.body);

    if(req.body.token && session[req.body.token]) {
        const findComment = "MATCH (p2:Users)-[:TELL]->(p3:Comments) RETURN p2.username as username, p3.text as text, ID(p3) as id";
        callbackFindComment = function (err, data) {
            console.log(data);
            if (err) {
                throw err
            }
            else {
                res.json(data);
            }
        }
        db.cypher({query: findComment}, callbackFindComment);
    }
})

app.post("/getInfo", function(req,res,next){
    if(req.body.token && session[req.body.token]){
        res.json({status: session[req.body.token].username})
    }
    else{
        res.json({status: false, msg: "unknown"})
    }
});

app.listen(8000);
console.log("app running on port 8000");