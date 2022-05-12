const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
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
