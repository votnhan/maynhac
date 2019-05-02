const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    lyrics:[String],
    comments:[{
        content: String,
        commentator:String,
        datecomment: {
            type: Date,
            default: () => new Date().toISOString()
        }
    }],
    dateposted:{
        type:Date,
        default: () => new Date().toISOString()
    },
    numlike:{
        type:Number,
        default:0
    },
    numdislike:{
        type:Number,
        default:0
    },
    numlisten:{
        type:Number,
        default:0
    },
    type:Number,
    author:String
});

const Song = mongoose.model('Song', SongSchema);
module.exports = {
    Song,
    SongSchema
}