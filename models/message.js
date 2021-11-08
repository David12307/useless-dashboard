var mysql = require('mysql2');
let messages = [];

var con = mysql.createConnection({
    user: "root",
    password: "1234",
    database: "library"
});


con.query('SELECT * FROM messages', (err, result) => {
    if (err) throw err;
    console.log(result);

    for (let i = 0; i < result.length; i++) {
        messages.push(result[i].message);
    }
});

module.exports = messages;