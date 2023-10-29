// get the client
const express = require('express');
const mysql = require('mysql2/promise');
const app = express()
const port = 3306
const bodyParser = require('body-parser');
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Views
app.set('view engine', 'ejs');
app.set('views', 'views');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'index.ejs');
app.set("layout extractStyles", true);
app.use(express.static('public'));

async function main() {
    const pool = await mysql.createPool({
    host: 'localhost',
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: 'opentutorials'
    });

    // promise문에서는 콜백 함수 사용 X
    try {
        const [rows, fields] = await pool.query('SELECT * FROM topic');
        console.log(rows); 
        console.log(fields);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

main();