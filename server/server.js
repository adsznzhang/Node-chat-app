const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');


var app = express();
const port = 3000;

app.use(express.static(publicPath));

app.listen(port, function() {
    console.log('Example app listening on port' + port);
});

