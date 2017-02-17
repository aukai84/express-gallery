const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const gallery = require('./routes/gallery.js');
const create = require('./routes/create.js');
const login = require('./routes/login.js');
const secret = require('./routes/secret.js');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('./config/config.json');

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
app.use(session({ cookie: { maxAge: 60000 }}));
// app.use(session({
//     secret: CONFIG.SESSION_SECRET
// }));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// const authenticate = (username, password) => {
//   // get user data from the DB
//   const { USERNAME } = CONFIG;
//   const { PASSWORD} = CONFIG;

//   // check if the user is authenticated or not
//   return ( username === USERNAME && password === PASSWORD );
// };

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    User.findOne({username: username})
    .then((err, user) => {
        if(err) {return done(err);}
        if(!user){
            return done(null, false, {message: "Incorrect username..."});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: "Incorrect password..."});
        }
        return done(null, user);
    });
    // if( authenticate(username, password) ) {

    //   // User data from the DB
    //   const user = {
    //     name: 'Joe',
    //     role: 'admin',
    //     favColor: 'green',
    //     isAdmin: true,
    //   };

    //   return done(null, user); // no error, and data = user
    // }
    // return done(null, false); // error and authenticted = false
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  // User.findById(id, function(err, user) {
    return done(null, user);
  // });
});
app.use('/login', login);
app.use('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}));
app.use('/gallery', gallery);
app.use('/secret', isAuthenticated, secret);
app.use('/create', create);

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        console.log('NOPE BRAH');
        res.redirect('/login');
    }
}

app.get('/', (req, res) => {
    Photo.findAll({order: "id"})
    .then((photos) => {
        res.render('index', {photos: photos});
    });
});

module.exports = app;