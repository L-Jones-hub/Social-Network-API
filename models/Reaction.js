const { Schema, model } = require("mongoose");


const reactionSchema = new Schema({
  text: String,
  username: String,
});


const Comment = model("reaction", reactionSchema);

module.exports = Comment;
