const express = require('express');
const router = express.Router();
var mysql = require('mysql2');
const Message = require('../models/message');
let currUser

router.use(express.static('public'));

var con = mysql.createConnection({
    user: "root",
    password: "1234",
    database: "library"
});

con.connect((err) => {
    if (err) throw err;

    router.get('/', (req, res) => {
        res.render('login');
    });

    router.post('/', (req, res) => {
      con.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`, (err, result) => {
        if (err) throw err;
        console.log(result);
        
        if (result.length == 1) {
          isValid = true;
          currUser = req.body.username;
          
          if (req.body.username == 'david') {
            res.render('admin', { username: req.body.username, messages: Message });
          } else {
            res.render('home', { username: req.body.username, messages: Message });
          }

          console.log('You have succesfully logged in!');
        } else if (result.length == 0) {
          res.redirect('/login');
          console.log('Password or Username incorrect / Account not found.');
        } else {
          res.redirect('https://www.youtube.com/watch?v=VBlFHuCzPgY');
          console.log('Something went wrong, please try again later.');
        }
      });
    });

    // router.post
    router.post('/messageuploaded', (req, res) => {
      con.query(`INSERT INTO messages (message) VALUES ('${req.body.messagetoupload}')`, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('admin', { username: currUser, messages: Message });
      });
    });
});

module.exports = router;