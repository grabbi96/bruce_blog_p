const mongoose = require('mongoose');
const slug = require('slugs');

const { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: String,
  slug: String,
  published: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
}, { timestamps: true });

PostSchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.title);
  // find other stores that have a slug of test, test-1, test-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const postsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (postsWithSlug.length) {
    this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
