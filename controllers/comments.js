// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');

const session = require('express-session');
const express = require('express');
const router = express.Router();


// delete a comment
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Comment.remove(query, function(err){
    if(err){console.log(err)}
    res.send('Success');
  })
})

// post a new comment
router.post('/add', function(req,res){
  let comment = new Comment();
  comment.author = req.session.user;
  comment.event = req.body.name;
  comment.comment = req.body.comment;


  comment.save(function(err){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('/');
    }
  })
})


module.exports = router;
