const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin'

//GET
//ADMIN LOGIN PAGE


router.get('/admin', async (req, res) => {
    const locals = {
        title: "Admin",
        // image: "My Image",
        description: "This is my blog."
    }
    //were looking for the posts here
    try {
      res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) { //error if there's an error on finding posts
      console.log(error);
    }
});

//POST
//ADMIN CHECK LOGIN

router.post('/admin', async (req, res) => {
  try {

    const { username, password } = req.body;

    if(req.body.username === 'admin' && req.body.password === 'password') {
      res.send('You are logged in.')
    }else {
      res.send ('Wrong username or password');
    }

  } catch (error) { 
    console.log(error);
  }
});

//POST
//ADMIN REGISTER

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const ser = await User.create({ username, password:hashedPassword });
      res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'User already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

  } catch (error) {
    console.log(error);
  }
});



module.exports = router;  
