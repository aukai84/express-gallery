const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const gallery = require('./routes/gallery.js');

const app = express();

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/gallery', gallery);

let db = require('./models');
let Photo = db.Photo;

app.get('/', (req, res) => {
    Photo.findAll()
    .then((photos) => {
        console.log(photos);
        res.render('index', {photos: photos});
    });
});

module.exports = app;