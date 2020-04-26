const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// Register form
router.get('/register', function(req, res){
  res.render('register')
});

//Register process
router.post('/register',function(req, res){
  const name = req.body.name;
  const username = req.body.username;
  // these cant be added yet
  // req.checkBody('username', 'Username is required').notEmpty();
  // req.checkBody('name', 'name is required').notEmpty();

  //let errors = req.validationErrors();
  // if(errors){
  //   res.render('register',{
  //     errors:errors
  //   })
  //}else{
    let newUser = new User({
      name:name,
      username:username
    });
    newUser.save(function(err){
      // theres a better way to do this i know
      if(err){
        console.log(err);
        return;
      }else{
        // no flash yet
        //req.flash('success', 'you are registered and can log in');
        console.log('success', 'you are registered and can log in');
        res.redirect('/users/login');
      }
    }); // I think this is in the correct place
  //}
});

router.get('/login',function(req, res){
  res.render('login');
});

// login process
router.post('/login',function(req,res,next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req,res, next);
});

module.exports = router;
