import mongoose from "mongoose";

 export const commentSchema = mongoose.Schema({
    content: {type: String, require: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
}, {timestamps: true});