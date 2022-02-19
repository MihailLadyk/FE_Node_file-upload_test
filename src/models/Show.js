const { Schema, model } = require('mongoose');

const Show = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releasedAt: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('show', Show);
