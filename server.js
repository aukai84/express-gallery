const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const isAuthenticated = require('./public/js/modules.js').isAuthenticated;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const gallery = require('./routes/gallery.js');
const create = require('./routes/create.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');
const secret = require('./routes/secret.js');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('./config/config.json');
const RedisStore = require('connect-redis')(session);

const app = express();

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

let db = require('./models');
let Photo = db.Photo;
let User = db.User;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser('keyboard cat'));
app.use(session({
    store: new RedisStore(),
    secret: 'keyboard cat'
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    User.findOne({
        where: {
            username: username,
            password: password
        }
        })
    .then((user) => {
        return done(null, user);
    })
    .catch(err => {
        return done(err);
    });
  }
));
passport.serializeUser(function(user, done) {
  return done(null, user);
});
passport.deserializeUser(function(user, done) {
    return done(null, user);
});
app.use('/login', login);
app.use('/login', passport.authenticate('local', {
    successRedirect: '/gallery/new',
    failureRedirect: '/create',
    failureFlash: "Can't find user... Please try again!",
    successFlash: "Successfully logged in!"
}));
app.use('/logout', logout);
app.use('/gallery', gallery);
app.use('/secret', isAuthenticated, secret);
app.use('/create', create);
app.get('/', (req, res) => {
    Photo.findAll({order: "id"})
    .then((photos) => {
        res.render('index', {photos: photos});
    });
});

module.exports = app;