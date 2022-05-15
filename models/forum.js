const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 3,
  },
  userId: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Object,
    },
  ],
  votes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", forumSchema);
