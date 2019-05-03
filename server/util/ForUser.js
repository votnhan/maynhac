function getObjectReaction(reactions, songid) {
    for (let i = 0; i < reactions.length; i++) {
        const element = reactions[i];
        if(element.songid == songid){
            return element;
        }
    }
    return;
}

module.exports = {getObjectReaction};
