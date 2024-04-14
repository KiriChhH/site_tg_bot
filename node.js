const mysql = require('mysql');
const fs = require('fs');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Phones',
  password: ''
});

conn.connect( err => {
    if(err) {
        console.log(err);
        return err;
    }
    else {
        console.log(" ---- OK ---- ")
    }
})

let query = "SELECT * FROM products";

json = {}

conn.query(query, (err, result, field) => {
    json = JSON.stringify(result);
    fs.writeFile('./foo.json', json, (err) => {
        if (!err) {
            console.log('done')
        }
    })
});

conn.end(err => {
    if(err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Connection closed');
    }
});

