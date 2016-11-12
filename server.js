var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var app = express();

// I use this to serve static files in the assets folder. Could be CSS files or possible JS files.
app.use(express.static(__dirname + '/assets'));

// Home page
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// Contact page
app.get('/contact', function(request, response) {
  response.sendFile(__dirname + '/contact.html');
});

// Courses list
app.get('/courses', function(request, response) {

  fs.readFile('courses.json', 'utf8', function(err, data) {

    var courses = JSON.parse(data);

    response.locals = {
      courses: courses.list
    };

    response.render('courses.ejs');
  });
});

// Course
app.get('/courses/:id', function(request, response) {
  fs.readFile('courses.json', 'utf8', function(err, data) {

    var courses = JSON.parse(data);
    var course = courses.list.filter( function(obj) {
      return obj.id === parseInt(request.params.id);
    });

    if (course.length)
      course = course[0];
    else
      course = null;

    response.locals = { course: course };
    response.render('course.ejs');
 });
});



app.listen(8000);

console.log('Server running http://localhost:8000');
