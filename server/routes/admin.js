const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

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



module.exports = router;  
