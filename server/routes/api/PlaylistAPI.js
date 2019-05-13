require('dotenv').config();
const express = require('express');
const utilUser= require('../../util/ForUser');

const {User} = require('../../models/User');
const {Playlist} = require('../../models/Playlist');
const {Song} = require('../../models/Song');

const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

router.get('/Playlist', verifyToken, (req, res, next) => {
    const username = req.username;
    utilUser.getUser(username, res, (data) => {
            const playlistIds = data.listplaylists;
            Playlist.find({_id: {$in: playlistIds}}).then(
                playlist => {
                    res.status(200).send(playlist);
                }
            )
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    });
});

router.post('/createPlaylist', verifyToken, (req, res, next) => {
    const {name, description, typeid} = req.body;
    const username = req.username;
    let newPlaylist = new Playlist({name, description, type:typeid } );
    newPlaylist.save().then(
        result => {
            const idplaylist = result._id;
            User.update({username}, {$push: {listplaylists: idplaylist}}).then(
                data =>  {res.status(200).send(result); }
            )
            .catch(err => {
                console.log(err); 
                res.status(500).send(err)
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
                res.status(500).send(err);
            });
        }
    )
    .catch( err => {
        console.log(err);
        res.status(500).send(err);
    });
});

router.post('/updatePlaylist', verifyToken, (req, res, next) => {
    const {name, description, type, idplaylist} = req.body;
    Playlist.findOneAndUpdate({_id: idplaylist},{name, description, type}, {new:true}, (err, data) =>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(data);
    });

});

router.get('/SongsOfPlaylist', verifyToken, (req, res, next) => {
    const username = req.username;
    const {playlistId} = req.query;
    utilUser.getUser(username, res, (user) => {
        if(user.listplaylists.includes(playlistId)){
            Playlist.findOne({_id: playlistId}, (err, playlist) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                const songIds =playlist.songs;
                Song.find({_id: {$in: songIds}}, (err, songofplaylist) => {
                    if(err){
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.status(200).send({playlist, songs: songofplaylist});
                })
            });
        }
        else{
            res.status(404).send('This playlist is not found.')
        }

    });
});


module.exports = router;