import mongoose from "mongoose";

mongoose.connect();

const userSchema = mongoose.Schema({
   username: {type:String, require: true, unique: true},
   phone: {type: String, require: true, unique: true},
   email: {type: String, require: true, unique: true},
   password: {type: String, require: true}
});

module.exports = mongoose.model('User',userSchema);