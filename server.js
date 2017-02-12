const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const gallery = require('./routes/gallery.js');
const methodOverride = require('method-override');


const app = express();

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

let db = require('./models');
let Photo = db.Photo;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/gallery', gallery);

app.get('/', (req, res) => {
    Photo.findAll()
    .then((photos) => {
        res.render('index', {photos: photos});
    });
});

module.exports = app;