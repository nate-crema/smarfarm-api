//module load
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const getIP = require('ipware')().get_ip;
const crypto = require('crypto');
const axios = require('axios');
const mongoose = require('mongoose');
const cryoto = require('crypto');
const async = require('async');

const app = express();


const hash_code = "5648erjfw0mej1qcedhJ@#)$%F)HFM#DU@!FC";

//server open

const port = 80;
const ip_local = "localhost";
const ip_outward = "1.242.22.109";
const ip = ip_local;
const domain = 'N/a';

const ip_mysql_real = "175.116.45.41";
const ip_mysql_local = "localhost";
const ip_mysql = ip_mysql_real;

const server = app.listen(port, ip, function() {
    console.log(`
        | KDMHS Smartfarm API |
    
        Started server in port: ` + port + `
        Server Link: http://` + ip + `: ` + port + `
    `);
});





const dbConnection = mysql.createConnection({
    host: ip_mysql,
    user: 'assertive_dimigo',
    password: 'smartfarm123',
    database: 'assertive'
});

function mysql_cmf(command) {
    async.waterfall([
        function(callback) {
            dbConnection.connect();
            callback(null);
        },
        function(callback) {
            dbConnection.query(command, (err, rows, fields) => {
                if (!err) {
                    callback(null, { err, rows, fields });
                } else {
                    callback(null, "Error");
                }
            })
        },
        function(result, callback) {
            dbConnection.end();
            return result;
        }
    ])
}




var date = new Date().getDate();

if (date < 10) {
    date = '0' + date;
}

var month = new Date().getMonth()+1;
if (month < 10) {
    month = '0' + month;
}

var hour = new Date().getHours();
if (hour < 10) {
    hour = '0' + hour;
}

var minute = new Date().getMinutes();
if (minute < 10) {
    minute = '0' + minute;
}

var second = new Date().getSeconds();
if (second < 10) {
    second = '0' + second;
}



const time = ''+new Date().getFullYear()+month+date + '-' + hour+minute+second;






//webpage route setting
// app.set('views', __dirname + "/ejs");
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// app.use(express.static(__dirname + "/design_html"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//session setting
app.use(session({
    key: 'assertive_webmarket',
    secret: '!&^@#*$(%$#*)@#J$_H(%KGF$JH*%)$#I#)$FKassertive_@#^&GH%*(Y*U#$J@)FK(smartfarm_kdmhs_HQ(&#@%*GJ)FMWIwebmarket',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 24000
    }
}));

//router setting

var router = require('./router')(app, fs, path, crypto, axios, dbConnection, getIp, async, hash_code);

