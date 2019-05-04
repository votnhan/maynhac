const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const HomePageSchema = new Schema({
    links_image:[String],
    index: Number
});

const HomePage = mongoose.model('HomePage', HomePageSchema);
module.exports = {
    HomePage,
    HomePageSchema
}