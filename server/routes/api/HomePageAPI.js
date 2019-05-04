require('dotenv').config();
const express = require('express');
const {HomePage} = require('../../models/Homepage');

const router = express.Router();

router.get('/defaultPage', (req, res) =>{
    HomePage.findOne({index: 0}, (err, page) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(page.links_image);
    });
});


module.exports = router;
