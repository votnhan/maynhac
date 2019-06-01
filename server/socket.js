const socket = require('socket.io');
const {Song} = require('../../models/Song');

module.exports = (server) => {
    const io = socket(server);
    io.on('connection', socket => {
        console.log('A new client connected to server', socket.id);

        socket.on('PostUserComment', data => {
            
            const {content, commentator ,songId} = data;

            const comment = {
                "content": content,
                "commentator": commentator,
                "datecomment": new Date().toISOString()
            }
        
            Song.findOneAndUpdate({_id: songId}, {$push: {comments: comment}}, {new: true}, (err, data) => {
                if(err){
                    console.log(err);
                    return socket.broadcast.to(socket.id).emit({type: "Error", message: err});
                }
                comment["songId"] = songId;
                socket.broadcast.emit('ResUserComment', comment);
            });
        
        });

    });

}