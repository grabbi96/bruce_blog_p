const mongoose = require('mongoose');

const { Schema } = mongoose;

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
