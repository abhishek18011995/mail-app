var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongojs = require("mongojs");
var db = mongojs('mail', ['login', 'inbox', 'sentbox']);

app.set('trust proxy', 1) // trust first proxy
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    // key: 'JSESSIONID', // generates sticky session

    secret: 'hello moto',
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

        secure: false
    },
    saveUninitialized: false,
    resave: false
}));

// app.get('#/inbox',function(req,res){
//  console.log("avi");
//              res.sendFile(path.join(__dirname + '/public/inbox.html'));
//              // res.sendFile('inbox.html');
//             });

app.post('/login', function(req, res, next) {

    var user = req.body;
    db.login.findOne({
        email: user.email,
        password: user.password


    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        // if (docs.length == 0) {
        if (!docs) {
            res.send("true");
            return next();
        }

        if (docs) {
            req.session.email = docs.email;
            var userName=docs.firstName+" "+docs.lastName;
            console.log(userName);
            // res.send("correct credentials");
            res.json(userName);

        }
    });
});

app.post('/signUp', function(req, res, next) {

    var newUser = req.body;
    db.login.insert({
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {

            db.inbox.insert({ email: newUser.email, inbox: [] })

            db.sentbox.insert({ email: newUser.email, sentbox: [] });
            res.json(docs);
        }
    });
});

app.get('/inbox', function(req, res, next) {
    db.inbox.findOne({
        email: req.session.email
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            res.json(docs);
        }
    });
});

app.get('/sentbox', function(req, res, next) {
    console.log("sent");
    db.sentbox.findOne({
        email: req.session.email
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            res.json(docs);
        }
    });
});

app.post('/composeMailValidation', function(req, res, next) {

    var composeEmail = req.body.email;
    db.login.findOne({
        email: composeEmail
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if(!docs){

            res.send(true)
        }

        if (docs) {

            res.send(false);
        }
    });

});

app.post('/compose', function(req, res, next) {

    var newMail = req.body;

    db.sentbox.update({
        email: req.session.email
    }, {
        $push: {
            'sentbox': {
                to: newMail.email,
                subject: newMail.subject,
                message: newMail.message
            }
        }

    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {

            db.inbox.update({
                email: newMail.email
            }, {
                $push: {
                    'inbox': {
                        from: req.session.email,
                        subject: newMail.subject,
                        message: newMail.message
                    }
                }
            })
            console.log("working");
            res.json(docs);
        }
    });
});


app.listen(3000);
