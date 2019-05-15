const mongoose = require('mongoose');
const Schema =  mongoose.Schema ;

const HistorySchema = new Schema({
    username:{
        type:String,
        required:true
    },
    songid:{
        type:String,
        required:true
    },
    listencount: Number,
    timelisten:{
        type:Date,
        default: () => new Date().toISOString()
    }
});

const History = mongoose.model('History', HistorySchema);

module.exports = {
    History,
    HistorySchema
}