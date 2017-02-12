const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const gallery = require('./routes/gallery.js');
const methodOverride = require('method-override');

const app = express();

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/gallery', gallery);

let db = require('./models');
let Photo = db.Photo;

app.get('/', (req, res) => {
    Photo.findAll()
    .then((photos) => {
        res.render('index', {photos: photos});
    });
});

module.exports = app;