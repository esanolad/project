// JavaScript source code
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db=require('./config/db')
var app = express();
var port = 8000;

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
MongoClient.connect(db.url, function (err, database) {
    if (err) return console.log(err);
    console.log("Connected to database\n");
    //console.log(database.collection('student'));
    //require('./app/routes')(app, database.collection('student'));
    var collection = database.collection('student')

    //create student resource
    app.post('/create/', (req, res) => {
        //console.log(req);
       /* var student = {
            firstName: req.body.firstName, middleName: req.body.middleName, lastName: req.body.lastName,
            grade: req.body.grade, nationality: req.body.nationality, gender: req.body.gender,
            userName: req.body.userName, password: req.body.password
        };*/
        var student = req.body;
        console.log("New Item: \n" + req);
        /*
        collection.insert(student, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log("sending result: \n" + result);
                res.send(result.insertedIds + " was inserted sucessfully");
            }
        });*/

    });
    
    //find Student Resource
    app.get('/getById/:id', function (req, res) {
        console.log(req.params.id);
        var findKey = { _id: new objectID(req.params.id) };
        collection.find(findKey).toArray( function (err, results) {
            if (err) {
                console.log(err)
            } else {
                console.log(results);
                if (results[0]) {
                    res.send(results[0]);
                } else {
                    res.end("Resource is not found");
                }
                   
            }
            
        });
        
    });
    app.get('/get', function (req, res) {
       // console.log(req.params.id);
        //var findKey = { _id: new objectID(req.params.id) };
        collection.find().toArray(function (err, results) {
            if (err) {
                console.log(err)
            } else {
                console.log(results);
                if (results) {
                    res.send(results);
                } else {
                    res.end("Resource is not found");
                }

            }

        });

    });
    //delete student resource
    app.delete('/deleteById/:id', function (req, res) {
        var Key = { _id: new objectID(req.params.id) };
        collection.remove(Key, function (err, results) {
            if (err) {
                console.log(err)
            } else {
                res.end("Deleted");
            }
        });
    });

    //Update Student Resource
    app.put('/updateGrade/:id', function (req, res) {
        var Key = { _id: new objectID(req.params.id) };
        var grade = { grade: req.body.grade };
        collection.find(Key).toArray(function (err, results) {
            if (err) {
                console.log(err)
            } else {
                if (results[0]) {
                    collection.update(Key, grade, function (err, results) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("done");
                            res.end("Resource is updated");
                        }
                    });
                } else {
                    res.end("Resource is not found");
                }

            }

        });
        
    });
});

//require('./app/routes')(app, {});
app.listen(port, function () {
    console.log("Server Started, Listening on Port " + port);
})
app.use(express.static(__dirname + '/public'));












/*

app.all('/', function (req, res, next) {
    res.write('all\n');
    next();
})

app.put('/add', function(req, res){
    res.end('put\n');
    
})
app.get('/', function (req, res) {
    res.end('get\n');
})
app.post('/', function (req, res) {
    res.end('post\n');
})
app.delete('/', function (req, res) {
    res.end('Delete\n');
})
app.listen(port, function () {
    console.log('We are live on ' + port);
});
/*app.use(bodyParser());
app.use(cookieParser());
app.use(function (req, res) {
    //res.cookie('as', 'lol');
        //res.end('hello');
        if (req.cookies.name) {
            console.log(req.cookies.name)
            res.end('Cookies has already been set!\n');
        } 
        else {
            res.cookie('name', 'LADi');
            res.end('Setting Cookies\n');
        }
        console.log(req.query);
    //console.log(req.headers['cookie']);
    
    /*if (req.body.foo) {
        //res.end('Body Passed ' + req.body.foo + "\n");
        console.log(req.headers['cookie']);
        res.cookie('name', 'foo');
        res.end('Hello!')

    }
    else {
            res.end('Body does not have foo\n');
        }
    
}) */

