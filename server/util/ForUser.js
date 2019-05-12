const {User} = require('../models/User');

function getObjectReaction(reactions, songid) {
    for (let i = 0; i < reactions.length; i++) {
        const element = reactions[i];
        if(element.songid == songid){
            return element;
        }
    }
    return;
}

function getUser(username, res, callback){
    User.findOne({username},(err, user) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        callback(user);
    });
}


module.exports = {getObjectReaction, getUser};
