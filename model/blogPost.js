import mongoose, { mongo } from "mongoose";

const blogPostSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    likes: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
});

module.exports = mongoose.model('BlogPost', blogPostSchema);