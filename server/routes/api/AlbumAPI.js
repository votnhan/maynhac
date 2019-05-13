require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {Song} = require('../../models/Song');
const {Album} = require('../../models/Album');

const util = require('../../util/ForUser');

const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

router.post('/createAlbum', verifyToken, (req, res, next) => {
    const username = req.username;
    const {name, title, description, author} = req.body;
    const newAlbum = new Album({name, title, description, author});
    newAlbum.save((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        User.updateOne({username}, {$push: {listalbums: data._id}}, (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(200).send(data);
        });
    });
});

router.post('/removeAlbum', verifyToken, (req, res, next) => {
    const username = req.username;
    const {idalbum} = req.body;
    User.updateOne({username}, {$pull: {listalbums: idalbum}}, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        if(result.nModified == 1){
            Album.remove({_id:idalbum}, (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
        else{
            return res.status(404).send('This user is not found.');
        }

    });
});

router.post('/updateAlbum', verifyToken, (req, res, next) => {
    const username = req.username;
    const {name, title, description, author, idalbum} = req.body;
    User.findOne({username}, (err, user) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        var listalbums = user.listalbums;
        if(listalbums.includes(idalbum)){
            Album.findOneAndUpdate({_id:idalbum}, {name, title, description, author}, {new:true}, (err, album)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).send(album);
            });
        }
        else{
            return res.status(404).send('This album is not found.');
        }
    });
});



module.exports = router;