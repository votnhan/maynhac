require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {Playlist, PlaylistSchema} = require('../../models/Playlist');
const {Song, SongSchema} = require('../../models/Song');

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

router.get('/playlist', verifyToken, (req, res, next) => {
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
            })
            
        }
    )
    .catch(err => {
            console.log(err);
            res.status(500).send('Get playlist failed.');
        }
    )
});

router.post('/login', (req, res) => {
    
    const {username, password} = req.query;
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

router.post('/postsong', verifyToken, (req, res, next) => {
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






module.exports = router;