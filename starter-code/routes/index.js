const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

// Some steps to guide you through the lab:
// Iteration 0: access the starter-code/ folder and install all the dependencies: npm install
// Iteration 0: You can also install the following packages that you will need later: npm install bcrypt connect-mongo express-session --save
// Iteration 0: add a .env file at the root of the starter-code folder with PORT=3000
// Iteration 1: create a models/ folder and a User model inside
// Iteration 1: create an auth router inside the routes/ folder and create your signup routes inside (GET and POST)… and remember to add the middleware for this new router in app.js
// Iteration 1: create the signup form inside the views/ folder
// Iteration 2: add the session middleware in app.js
// Iteration 2: create your login routes inside the auth router (GET and POST)
// Iteration 2: create the login form inside the views/ folder
// Iteration 3: create a site router inside the routes/ folder with handler function to check if user is logged in… and remember to add the middleware for this new router in app.js
// Iteration 3: create private routes inside the site router
// Iteration 3: create your private views
// and to help you, here’s the code along from today: https://github.com/ross-u/wd-ft-lecture-examples-03-2020/tree/master/m2/w5/d2 (edited) 
// ja muista!! käynnistä mongo.exe aina ku kone on buutannu!
// ja asennukset! esim "npm i connect-mongo express-session bcrypt --save" tai --save-dev (i on install.. -g on asenna globaalisti!)