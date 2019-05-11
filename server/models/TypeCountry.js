const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const TypeCountrySchema = new Schema({
    name:String,
    typeid: Number
});

const TypeCountry = mongoose.model('TypeCountry', TypeCountrySchema);
module.exports = {
    TypeCountry,
    TypeCountrySchema,
    
}