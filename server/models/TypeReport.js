const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const TypeReportSchema = new Schema({
    name:String,
    typeid: Number
});

const TypeReport = mongoose.model('TypeReport', TypeReportSchema);
module.exports = {
    TypeReport,
    TypeReportSchema
}