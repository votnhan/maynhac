const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    
    state:Boolean,
    typeid: Number,
    songs:[String],
    description:String,
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