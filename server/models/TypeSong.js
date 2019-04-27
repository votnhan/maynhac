const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const TypeSongSchema = new Schema({
    name:String,
    typeid: Number
});

const TypeSong = mongoose.model('TypeSong', TypeSongSchema);
module.exports = {
    TypeSong,
    TypeSongSchema
}