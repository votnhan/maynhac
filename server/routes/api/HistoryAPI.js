const {History} = require('../../models/History');
const verifyToken = require('../../middlewares/verifyToken');

const express = require('express');
const router = express.Router();
router.get('/listenSong', verifyToken, (req, res, next) => {
    const username = req.username;
    const {songid} = req.query;
    History.findOne({username, songid}, (err, data) => {
        if(data.length == 0){
            const newhistory = new History({username, songid});
            newhistory.save((err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
        else{
            History.findOneAndUpdate({username, songid}, {$inc: {listencount:1}}, {new:true}, (err, result) =>{
                if(err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
    });
});

module.exports = router;