const express = require("express");
const authRouter = express.Router();

// remember to add this in app.js! require and use in middleware!
const User = require("./../models/user")
const bcrypt = require("bcrypt");
const saltPower = 10; // 2^x defines the strength of encryption (how many iterations the hashing algorithm will take)

// GET url path: /auth/signup, get the form from views

authRouter.get("/signup", (req, res) => {
    res.render("auth-views/signup")
})

// POST auth/signup get auth details with req.body

authRouter.post("/signup", (req, res, next) => {
    // use req.body to get username+passwd
    const {username, password} = req.body;
    // do some validation of username/passwd
    console.log(username, password)

    if (username === "" || password === "") {
        console.log("empty username or passwd!");
        res.render("auth-views/signup", {errorMessage: "Empty username or password"})
        return
    };
    // here we could check passwd strength ...

    // here we check: is username unique, as in, is it already in DB and if not, create new User
    User.findOne({username})
        .then((userObj) => {
            if (userObj) { // it exists
                res.render("auth-views/signup", {errorMessage: "Invalid username"}) // username taken!
                return
            } else {
                console.log("user.findone else block, allowing user to sign up")
                // generate salt and encrypt user passwd
                const salt = bcrypt.genSaltSync(saltPower);
                const cryptPasswd = bcrypt.hashSync(password, salt)

                // create new User inside DB and save encrypted passwd
                User.create({username, password: cryptPasswd}) // this is a promise!
                    .then((userCreated) => {
                        // redirect somewhere
                        res.redirect("/")
                    })
                    .catch((err) => {
                        res.render("auth-views/signup", {errorMessage: "Error during signup"})
                    })
            }
        })
        .catch((err) => {
            next(err);
        }) // ^ not really sure why we do this :D

})
// GET auth/login
authRouter.get("/login", (req, res) => {
    res.render("auth-views/login");
})

// POST auth/login
authRouter.post("/login", (req, res, next) => {
    const {username, password} = req.body;
    // validation next!
    console.log("login username and passwd", username, password);
    if (username === "" || password === "") {
        res.render("auth-views/login", {errorMessage: "Empty username or password"});
        return
    }
    // look for the user in DB
    User.findOne({username})
        .then((user) => {
            //does the user exist?
            if (!user) {
                res.render("auth-views/login", {errorMessage: "Invalid username"})
            }
            else {
                // user exists, is password correct?
                const encryptedPasswd = user.password;
                const passwdCorrect = bcrypt.compareSync(password, encryptedPasswd); // returns boolean, i thinks

                if (passwdCorrect) {
                    // password is correct, log in user  and create session
                    // pass the user data to session middleware
                    user.password = "************" // where is this actually saved? why can we do this?
                    //res.redirect("/") this works with existing user!
                    req.session.currentUser = user;
                    // i guess home page???
                    res.redirect("/")
                }
            }
        })
        .catch((err) => console.log(err));
})

//maybe we need a logout part? assignment doesn't specify so dunno

module.exports = authRouter;