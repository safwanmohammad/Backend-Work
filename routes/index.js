var express = require('express');
var router = express.Router();
var gcard = require('../public/javascripts/gcards')
  

/* GET home listing. */

const useName = "zzz"
const password = "123"
var session;

router.get('/', function(req, res) {
  session = req.session; 
  console.log(session); 
  if(session.user){
    res.render('home',{gcard})
  }else{
    res.render('index');
  }
});

router.post('/home',(req,res) => {
  var q = req.body 
  if(useName === q.UserName && password === q.password){
    session = req.session ;
    session.user = q.UserName ;
    console.log(session);
    res.render('home',{gcard})
  }else if(q.password !== password && q.UserName !== useName){
    res.render('index',{allErr:'Invalid ID'})
  }else if(q.password !== password){
    res.render('index',{passErr:'Password is invalid'})
  }else if(q.UserName !== useName){m
    res.render('index',{userErr:'Username is invalid'})
  }
})
router.post('/logout',(req,res) => {
  req.session.destroy()
  
  res.redirect('/')
})


module.exports = router;