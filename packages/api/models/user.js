const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'visitor'],
      default: 'editor',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
