const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin'
const jwtSecret = process.env.JWT_SECRET;

//MIDDLEWARE 
//CHECKS LOGIN
const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized'} );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}

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
    
    const user = await User.findOne( { username } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
});

//GET 
//ADMIN DASHBOARD
//ADDED MIDDLEWARE SO NOT EVERYONE HAS ACCESS TO A DASHBOARD
//DASHBOARD IS PASSWORD PROTECTED

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const data = await Post.find();
    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout
    });

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
