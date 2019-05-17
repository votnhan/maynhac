require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {Song} = require('../../models/Song');
const {Playlist} = require('../../models/Playlist');
const {TypeSong} = require('../../models/TypeSong');
const {TypeCountry} = require('../../models/TypeCountry');

const utilUser = require('../../util/ForUser');
const utilSong = require('../../util/ForSong');

const verifyToken = require('../../middlewares/verifyToken');
const {uploadFileGoogleDrive} = require('../../middlewares/uploadFile');
const router = express.Router();

router.post('/postSong',[ verifyToken, uploadFileGoogleDrive] ,(req, res, next) => {
    const username  = req.username;
    const {name, lyrics, typeid, author, artist, typecountry} = req.body;
// router.post('/postSong',[ /* verifyToken,*/ uploadSongAWS] ,(req, res, next) => {
//     const username  = "vtrungnhan"/* req.username */;
//     const {name, lyrics, typeid, author, artist} = req.body;
    const unsignedname = utilSong.getSongName(name);
    const link = req.urlSong;
    const avatar = req.urlAvatar;
    
    const newSong = new Song({name, link, lyrics, type: typeid, author, unsignedname, artist, avatar, typecountry});
    newSong.save().then(
        song => {
            const idsong = song._id;
            User.update({username}, {$push: {listmusicsposted: idsong}}).then(
                data =>  {
                    res.status(200).send(song);
                }
            )
            .catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }
    )
    .catch(err => console.log(err))
});

router.post('/removeSong', verifyToken, (req, res, next) => {
    const username = req.username;
    const {songid} = req.body
    User.updateOne({username}, {$pull: {listmusicsposted: songid}}, {new:true}, (err, result)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        if(result.nModified == 1){
            Song.remove({_id:songid}, (err, result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).send(result);
            });
        }
        else{
            return res.status(404).send('This song is not found.');
        }
    });
});

router.get('/typeSong', (req, res) => {
    TypeSong.find().then(
        data => {
        res.status(200).send(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    });

});

router.get('/SongsbyTypeid', (req, res) => {
    const {typeid} = req.query;
    Song.find({type:typeid}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(404).send(err);
        }
        TypeSong.findOne({typeid}, (err, type) => {
            if(err){
                console.log(err);
                return res.status(404).send(err);
            }
            res.status(200).send({typename: type.name, songs: data});
        });
    });
});

router.get('/SongbyId', (req, res) => {
    const {songId} = req.query;
    Song.findOneAndUpdate({_id:songId}, {$inc: {numlisten:1}}, {new:true},(err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(data);
    });
});


router.post('/SongbyIds', (req, res) => {
    const {songIds} = req.body;
    Song.find({_id: {$in: songIds}}, (err, songs) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(songs);
    });
});


router.post('/contributeLyrics', (req, res) => {
    const {songId, lyrics} = req.body;
    Song.findOneAndUpdate({_id:songId}, {lyrics},{new:true} ,(err, data) =>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(data.lyrics);
    });
});

router.post('/addSongtoPlaylist', verifyToken,(req, res, next) => {
    const username = req.username;
    const {idsong, idplaylist} = req.body;
    utilUser.getUser(username, res, (user) => {
        var listplaylists = user.listplaylists;
        if (listplaylists.includes(idplaylist)){
            Playlist.findOne({_id:idplaylist}, (err, data) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                var songs = data.songs;
                if (songs.includes(idsong)){
                    return res.status(405).send({'type':'Dumplicated', 'idsong':idsong});
                }
                songs.push(idsong);
                data.save((err, playlist) => {
                    if(err){
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.status(200).send(playlist.songs);
                });
            });
        }
        else{
            res.status(404).send('This playlist is not found.');
        }
    });
});

router.post('/removeSonginPlaylist', verifyToken, (req, res, next) => {
    const {idsong, idplaylist} = req.body;
    const username = req.username;
    utilUser.getUser(username, res,(user) => {
        var listplaylists = user.listplaylists;
        if(listplaylists.includes(idplaylist)){
            Playlist.findOneAndUpdate({_id: idplaylist}, {$pull: {songs: idsong}}, {new: true}, (err, data) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).send(data.songs);
            });
        }
        else{
            res.status(404).send('This playlist is not found.');
        }
    });
});

router.post('/reaction', verifyToken, (req, res, next) => {
    const username = req.username;
    const {songId} = req.body;
    utilUser.getUser(username, res, (data) => {
        var reactions = data.reaction;
        var reactObj = utilUser.getObjectReaction(reactions, songId);
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
                        res.status(500).send(err)
                    }
                );
            }

        )
        .catch(
            err => {
                console.log(err);
                res.status(500).send(err);
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
    console.log(comment);
    console.log(songId);

    Song.findOneAndUpdate({_id: songId}, {$push: {comments: comment}}, {new: true}, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send(comment);
    });
});

router.post('/searchSong', (req, res) => {

    const {key} = req.body;

    Song.find({$or:[{name: {$regex:key,$options:"$i"}}, {unsignedname: {$regex:key, $options:"$i"}} ]}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(data);
    });
});

router.get('/topkSong', (req, res) => {
    const {k} = req.query;
    Song.find().sort({numlisten:-1}).exec((err, data)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(data.slice(0, k));
    });
});

router.get('/topkSongByTypeid', (req, res) => {
    const {k, typeid} = req.query;
    Song.find({type: typeid}).sort({numlisten: -1}).exec((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        utilSong.getTypeOfSong(typeid, res, (typesongname) => {
            res.status(200).send({typename: typesongname, songs: data.slice(0,k)} );
        });
        
    });

});

router.get('/topNewkSongByTypeid', (req, res) => {
    const {k, typeid} = req.query;
    Song.find({type:typeid}).sort({dateposted: -1}).exec((err, data) => {
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        utilSong.getTypeOfSong(typeid, res, (typesongname) => {
            res.status(200).send({typename: typesongname, songs: data.slice(0,k)});
        });
    });

});


router.get('/topkSongByTypeCountryid', (req, res) => {
    const {k, typecountryid} = req.query;
    Song.find({typecountry: typecountryid}).sort({numlisten: -1}).exec((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        utilSong.getTypeCountryOfSong(typecountryid, res, (typecountryname) => {
            res.status(200).send({typename: typecountryname, songs: data.slice(0,k)});
        });
        
    });
});

router.get('/topNewkSongByCountryid', (req, res) => {
    const {k, typecountryid} = req.query;
    Song.find({typecountry:typecountryid}).sort({dateposted: -1}).exec((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }

        utilSong.getTypeCountryOfSong(typecountryid, res, (typecountryname) => {
            res.status(200).send({typename: typecountryname, songs: data.slice(0,k)});
        });

    });

});

router.get('/typeCountrySong', (req, res) => {
    TypeCountry.find({},(err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send(data);
    });
});

router.get('/SongsbyTypeCountryid', (req, res) => {
    const {typecountryid} = req.query;
    Song.find({typecountry:typecountryid}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(404).send(err);
        }
        utilSong.getTypeCountryOfSong(typecountryid, res,(typecountryname) => {
            res.status(200).send({typename:typecountryname, songs: data});
        });

    });
});

router.get('/StatusOfSongsForUser', verifyToken, (req, res, next) => {
    const username = req.username;
    const {songId} = req.query;
    utilUser.getUser(username, res, (user) => {
        var reactresult = {'songid':songId, 'status':false};
        user.reaction.forEach(element => {
            if(element.songid == songId){
                reactresult['status'] = element.status;
                return ;
            }
        });
        res.status(200).send(reactresult);
    });
});

router.get('/ReactionsOfUser', verifyToken, (req, res, next) => {
    const username = req.username;
    utilUser.getUser(username, res, (user) => {
        var songids = []
        user.reaction.forEach( element => {
            if (element.status){
                songids.push(element.songid);
            }
        });

        Song.find({_id: {$in: songids}}, (err, songs) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(200).send(songs);
        });
    });
});

router.get('/noteHistory', verifyToken, (req, res, next) => {
    const username = req.username;
    const {songid} = req.query;
    const historylisten = {'songid':songid}
    User.findOneAndUpdate({username}, {$push:{history: historylisten}}, {new: true}, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result.history);

    });
});






module.exports = router;
