const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    songs:[String],
    type: Number,
    datecreate: {
        type:Schema.Types.Date,
        default: () => new Date().toISOString()
    },
    name:String,
    description:String
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = {
    Playlist,
    PlaylistSchema
}