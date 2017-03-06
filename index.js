var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello Ana!');
});

app.listen(3000, function() {
    console.log('server is listening at port 3000');
});