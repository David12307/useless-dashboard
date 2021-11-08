const express = require('express');
const app = express();
var mysql = require('mysql2');

app.set('view engine', "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var con = mysql.createConnection({
    user: "root",
    password: "1234",
    database: "library"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');

    let isValid = false;

    app.get('/', (req, res) => {
        if (isValid) {
          res.render('home');
        } else {
          res.render('login');
        }
    });

    // Login Page
    const loginRouter = require('./routes/login');
    app.use('/login', loginRouter);

    // Register Page
    const registerRouter = require('./routes/register');
    app.use('/register', registerRouter);
});

app.listen(3000);