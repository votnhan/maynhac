const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatarUrl: String,
    listmusicsposted: [String],
    listplaylists:[String],
    listalbums: [String],
    listreport: [String],
    
    reaction:[{
        songid:String,
        status:Boolean
    }],

    history: [{
        songid:String,
        timelisten: {
            type:Date,
            default: () => new Date().toISOString()
        }
    }],

    report: [{
        reportId:String,
        song:String
    }]
    
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    UserSchema
}

