const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name:String,
    title:String,
    datecreate: {
        type: Date,
        default: () => new Date().toISOString()
    },
    description:String,
    songs:[String],
    author:String
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = {
    Album,
    AlbumSchema
}