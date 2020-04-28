require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
// require routers!
const authRouter = require("./routes/auth-router")
const siteRouter = require("./routes/site-router")

// database name!!
mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// session middleware here, right?
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
//what do these do? :0

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator, auth practise';

// session middleware stuff here
app.use(
  session({
    secret: "keyboard kitty",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 24 * 60 * 60, // Default value - 2 days
    }),
  })
); // so how does this work?


const index = require('./routes/index'); // did the auth route on the beginning, what is preferred practice?
app.use('/', index);

// use auth route!
app.use("/auth", authRouter);
// private pages router WHY IS IT / AGAIN?? cant make /main work
app.use("/", siteRouter);

// note to self: app.js:ssä pitää importata se router ja sitten ottaa se käyttöön: app.use("/endpoint", reitittimen_nimi)
// routerin sisällä, importtaa express, tallenna se router muuttujana const myRouter = express.Router()
// määrittele ne itse reitit sitten myRputer.get jne.. ja  LOPUKSI MUISTA modules.export = myRputer !

module.exports = app;
