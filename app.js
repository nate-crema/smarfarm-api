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

//server open
const server = require('http').createServer(app);
// const io = require('socket.io')(server);

const port = 80;
const ip_local = "localhost";
const ip_outward = "1.242.22.109";
const ip = ip_local;
const domain = 'N/a';

const ip_mysql_real = "175.116.45.41";
const ip_mysql_local = "localhost";
const ip_mysql = ip_mysql_real;

// var mysql_connection = mysql.createConnection({
//     host: ip_mysql,
//     user: 'assertive_dimigo',
//     password: 'smartfarm123',
//     database: 'assertive'
// });


// var mysql_connection = mysql.createConnection({
//     host: ip_mysql,
//     user: 'foo',
//     password: 'bar',
//     database: 'assertive'
// });










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

var router = require('./router')(app, fs, path, getIP, axios, time, mysql, crypto, mysql_connection);

