require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {Playlist} = require('../../models/Playlist');

const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

router.get('/Playlist', verifyToken, (req, res, next) => {
    const username = req.username;
    User.findOne({username}).then(
        data => {
            const playlistIds = data.listplaylists;
            Playlist.find({_id: {$in: playlistIds}}).then(
                playlist => {
                    res.status(200).send(playlist);
                }
            )
            .catch(err => {
                console.log(err);
                res.status(500).send('Get playlist failed.');
            });
        }
    )
    .catch(err => {
            console.log(err);
            res.status(500).send('Get playlist failed.');
        }
    )
});

router.post('/createPlaylist', verifyToken, (req, res, next) => {
    const {name, description, typeid} = req.body;
    const username = req.username;
    let newPlaylist = new Playlist({name, description, type:typeid } );
    newPlaylist.save().then(
        data => {
            const idplaylist = data._id;
            User.update({username}, {$push: {listplaylists: idplaylist}}).then(
                data =>  {res.status(200).send(newPlaylist); }
            )
            .catch(err => {
                console.log(err); 
                res.status(500).send('Create playlist failed.')
            })
        }
    )
    .catch(err => console.log(err))
});

router.post('/deletePlaylist', verifyToken, (req, res, next) => {
    const username = req.username;
    const {playlistId} = req.body;
    
    User.update({username}, {$pull: {listplaylists: playlistId}}).then(
        user => {
            Playlist.remove({_id:playlistId}).then(
                data => res.status(200).send(data)
            )
            .catch(err => {
                console.log(err);
                res.status(500).send('Delete playlist failed.');
            });
        }
    )
    .catch( err => {
        console.log(err);
        res.status(500).send('Delete playlist failed.');
    });
});

router.post('/updatePlaylist', verifyToken, (req, res, next) => {
    const {name, description, type, idplaylist} = req.body;
    Playlist.findOneAndUpdate({_id: idplaylist},{name, description, type}, {new:true}, (err, data) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Update playlist failed.');
        }
        res.status(200).send(data);
    });

});


module.exports = router;