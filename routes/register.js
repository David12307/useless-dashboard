const express = require('express');
const router = express.Router();
var mysql = require('mysql2');
const formidable = require('formidable');
const fs = require('fs');

var con = mysql.createConnection({
    user: "root",
    password: "1234",
    database: "library"
});

con.connect((err) => {
    if (err) throw err;

    router.get('/', (req, res) => {
        res.render('register.ejs');
    });
    
    function addUser(username, email, password) {
        con.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err, result) => {
            if (err) throw err;
            console.log("Succesfully added a user to the database!");
        });
    }
    
    router.post('/', (req, res) => {
        con.query(`SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`, function(err, result) {
            if (err) throw err;
            console.log(result);
    
            if (result.length > 0) {
                res.redirect('/register');
                console.log('Username / Email already taken.');
            } else {
                addUser(req.body.username, req.body.email, req.body.password);

                console.log('Your account has been created!');
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;