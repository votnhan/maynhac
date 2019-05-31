const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    
    
    reasonId: Number,
    songId:String,
    description:String,
    state: {
        type: Boolean,
        default: () => false
    },
    datecreate: {
        type:Schema.Types.Date,
        default: () => new Date().toISOString()
    }

});

const Report = mongoose.model('Report', ReportSchema);
module.exports = {
    Report,
    ReportSchema
}