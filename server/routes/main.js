const express = require('express');
const router = express.Router();

//Routes
router.get('', (req, res) => {
    const locals = {
        title: "My Blog",
        description: "This is my blog."
    }


    res.render('index', { locals });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;  