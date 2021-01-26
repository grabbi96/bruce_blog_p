const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  body: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
