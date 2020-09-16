const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));
app.use(express.static('public'));
// default URL for website
/*
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/pages/home.html'));
    //__dirname : It will resolve to your project folder.
  });

app.use('./about', function(req,res){
    res.sendFile(express.static(__dirname+'/express/pages/about.html'));
    //__dirname : It will resolve to your project folder.
  });
  */

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/express/pages/home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname+'/express/pages/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname+'/express/pages/about.html'));
});

app.get('/bananas', (req, res) => {
    res.sendFile(path.join(__dirname+'/express/pages/bananas.html'));
});

app.get('/contactme', (req, res) => {
    res.sendFile(path.join(__dirname+'/express/pages/contactme.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname+'/express/pages/gallery.html'));
});

const server = http.createServer(app);
const port = 80;
server.listen(port);
console.debug('Server listening on port ' + port);
