var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
app.get('/contact', function(request, response) {
  response.sendFile(__dirname + '/contact.html');
});
app.get('/courses', function(request, response) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var products = JSON.parse(data);
    response.locals = {
      products: products.products
    };
    response.render('courses.ejs');
  });
});
app.listen(8000);

console.log('Server running http://localhost:8000');