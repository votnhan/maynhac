require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');

const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

router.get('/me', verifyToken, (req, res, next) =>{
    const username = req.username;
    User.findOne({username}, {_id:0, password: 0, __v:0}).then((user)=>{
        res.status(200).send(user);
    }).catch(err => {
        next(err);
    });
});

router.post('/login', (req, res) => {
    
    const {username, password} = req.body;
    if (username === undefined)
        res.status(422).send('Username is not provided');
    if (password === undefined)
        res.status(422).send('Password is not provided');
    
    User.findOne({username}, (err, user) => {
        if(err) {
            console.log(err);
            return;
        }
        if(!user)
            return res.status(404).send('User not found');
        
        if (user.password !== password)
            return res.status(404).send('Password is incorrect');

        const token = jwt.sign({data: username}, process.env.JWT_SECRET);
        res.status(200).send(token);
    });

});

router.post('/logout', verifyToken, (req, res, next) => {
    const username = req.username;
    res.status(200).send('Logout successfully.');
});

router.post('/signup', (req, res) =>{
    const {username, password, name, email} = req.body
    
    User.findOne({username}, (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        if(data){
            return res.status(409).send('User already exists.');
        }
        let newUser = new User({username, password, name, email});
        newUser.save().then(
            data => {res.status(200).send('Create user successfully.');}
        )
        .catch(err => console.log(err));
    })
});




module.exports = router;