const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const setUser = require('./public/js/modules.js').setUser;
const authenticateUser = require('./public/js/modules.js').authenticateUser;
const isAdmin = require('./public/js/modules.js').isAdmin;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const gallery = require('./routes/gallery.js');
const create = require('./routes/create.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');
const userPage = require('./routes/user-page.js');
const adminPage = require('./routes/admin-page.js');
const secret = require('./routes/secret.js');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('./config/config.json');
const RedisStore = require('connect-redis')(session);

const app = express();

let db = require('./models');
let Photo = db.Photo;
let User = db.User;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser('2813308004'));
app.use(session({
    store: new RedisStore(),
    secret: '2813308004',
    cookie: {maxAge: 60000}
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
    User.findOne({
        where: {
            username: username,
        }
    })
    .then((user) => {
        if(user === null){
            return done(null, false, {message: "bad username"});
        } else {
            bcrypt.compare(password, user.password, function(err, res){
                if(res){
                  return done(null, user);
                } else {
                    return done(null, false, {message: 'bad password'});
                }
             });
        }

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
    User.findOne({
        where: {
            id: user.id
        }
    })
    .then(user => {
    return done(null, user);

    });
});
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/login', login);
app.use(setUser);
app.use(authenticateUser);
app.use('/logout', logout);
app.use('/user-page', userPage);
app.use('/gallery', gallery);
app.use('/secret', secret);
app.use('/create', create);
app.use('/admin', isAdmin, adminPage);
app.get('/', (req, res) => {
    console.log(req.url)
    Photo.findAll({
        order: "id",
        include: {
            model: User,
            as: 'user'
        }
    })
    .then((photos) => {

        res.render('index', {photos, username: req.body.user, admin: req.body.admin, messages: res.locals.messages()});
    });
});



module.exports = app;