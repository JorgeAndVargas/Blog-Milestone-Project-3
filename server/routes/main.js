const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//Routes
router.get('', async (req, res) => {
    const locals = {
        title: "My Blog",
        image: "My Image",
        description: "This is my blog."
    }
    //were looking for the posts here
    try {
      const data = await Post.find();
      res.render('index', { locals, data });
    } catch (error) { //error if there's an error on finding posts
      console.log(error);
    }
});

//POST

 





router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;  

// function insertPostData (){
//     Post.insertMany([
//         {
//             title: "Test Blog Title",
//             image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg",
//             body: "This Is A Body Text Example"
//         },
//     ])
// };

// insertPostData();