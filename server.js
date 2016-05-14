var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
console.log((path.join(__dirname, 'public')));
var port = process.env.PORT || '3000';
app.listen(port);
