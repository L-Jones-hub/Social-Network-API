const { Schema, model } = require("mongoose");

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    text: String,
    username: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "reaction" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Initialize our Post model
const Thought = model("post", thoughtSchema);

module.exports = Thought;
