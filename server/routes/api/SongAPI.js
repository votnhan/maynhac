require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {Song} = require('../../models/Song');
const {Playlist} = require('../../models/Playlist');

const {TypeSong} = require('../../models/TypeSong');
const util = require('../../util/ForUser');

const verifyToken = require('../../middlewares/verifyToken');
const router = express.Router();

router.post('/postSong', verifyToken, (req, res, next) => {
    const username  = req.username;
    const {name, link, lyrics, typeid, author} = req.body;
    const newSong = new Song({name, link, lyrics, type: typeid, author});
    newSong.save().then(
        data => {
            const idsong = data._id;
            User.update({username}, {$push: {listmusicsposted: idsong}}).then(
                data =>  {
                    res.status(200).send(newSong);
                }
            )
            .catch(err => {
                console.log(err); 
                res.status(500).send('Upload song failed.')
            })
        }
    )
    .catch(err => console.log(err))
});

router.get('/typeSong', (req, res) => {
    TypeSong.find().then(
        data => {
        res.status(200).send(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Get type song failed.')
    });

});

router.get('/SongsbyTypeid', (req, res) => {
    const {typeid} = req.query;
    Song.find({type:typeid}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(404).send('Get song by type Id failed.');
        }
        res.status(200).send(data);
    })
});

router.get('/SongbyId', (req, res) => {
    const {songId} = req.query;
    Song.findOne({_id:songId}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Get song by Id failed.');
        }
        res.status(200).send(data);
    });
});

router.post('/contributeLyrics', (req, res) => {
    const {songId, lyrics} = req.body;
    Song.findOneAndUpdate({_id:songId}, {lyrics},{new:true} ,(err, data) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Contribute lyrics failed.');
        }
        res.status(200).send(data.lyrics);
    });
});

router.post('/addSongtoPlaylist', verifyToken,(req, res, next) => {
    const {idsong, idplaylist} = req.body;
    
    Playlist.findOne({_id:idplaylist}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Add song to playlist failed.');
        }
        var songs = data.songs;
        if (songs.includes(idsong)){
            return res.status(405).send({'type':'Dumplicated', 'idsong':idsong});
        }
        songs.push(idsong);
        data.save((err, playlist) => {
            if(err){
                console.log(err);
                return res.status(500).send('Add song to playlist failed.');
            }
            res.status(200).send(playlist.songs);

        });
    });
});

router.post('/removeSonginPlaylist', verifyToken, (req, res, next) => {
    const {idsong, idplaylist} = req.body;
    Playlist.findOneAndUpdate({_id: idplaylist}, {$pull: {songs: idsong}}, {new: true}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Remove song in playlist failed.');
        }
        res.status(200).send(data.songs);
    });
});

router.post('/reaction', verifyToken, (req, res, next) => {
    const username = req.username
    const {songId} = req.body
    User.findOne({username}, (err, data) => {
        if (err){
            console.log(err);
            return res.status(500).send('React song failed.');
        }
        if(!data){
            return res.status(404).send('Not found username.');
        }
        var reactions = data.reaction;
        var reactObj = util.getObjectReaction(reactions, songId);
        var status = true;
        if(reactObj){
            if(reactObj.status == true){
                reactObj.status = false;
                status = false;
            }
            else{
                reactObj.status = true;
            }
        }
        else{
            reactions.push({'songid':songId, 'status':status});
        }
        data.save().then(
            data => {
                const react = {'songid':songId, 'status':status};
                const amount = status?1:-1;
                Song.updateOne({_id: songId}, {$inc: {numlike: amount}}).then(
                    data => {res.status(200).send(react);}
                ).catch(
                    err => {
                        console.log(err);
                        res.status(500).send('React song failed.')
                    }
                );
            }
            
        )
        .catch( 
            err => {
                console.log(err);
                res.status(500).send('React song failed.');
        });
    });
});

router.post('/comment', verifyToken, (req, res, next) => {
    
    const {content, commentator ,songId} = req.body;
    const comment = {
        "content": content,
        "commentator": commentator,
        "datecomment": new Date().toISOString()
    }

    Song.update({_id: songId}, {$push: {comments: comment}}).then(
        data => {
            res.status(200).send(comment);
        }
    )
    .catch(err => {
        console.log(err);
        res.status(500).send('Comment song failed.');
    });
});

module.exports = router;