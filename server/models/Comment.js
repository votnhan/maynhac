const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    commentator: String,
    datecomment: {
        type: Date,
        default: () => new Date().toISOString()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
    Comment,
    CommentSchema
}