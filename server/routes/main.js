const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//Routes
router.get('', async (req, res) => {
     //were looking for the posts here
     try {
        const locals = {
            title: "My Blog",
            image: "My Image",
            description: "This is my blog."
        }
        //oer oage we display only 4
        let perPage = 4;
        let page = req.query.page || 1;
        
        const data = await Post.aggregate([{ $sort: { createdAt: -1 }}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) +1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (error) {
        console.log(error);
    }
});

// router.get('', async (req, res) => {
//     const locals = {
//         title: "My Blog",
//         image: "My Image",
//         description: "This is my blog."
//     }
//     //were looking for the posts here
//     try {
//       const data = await Post.find();
//       res.render('index', { locals, data });
//     } catch (error) { //error if there's an error on finding posts
//       console.log(error);
//     }
// });

 





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