const mongoose = require('mongoose');
const slug = require('slugs');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: String,
}, { timestamps: true });

CategorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of test, test-1, test-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const categoriesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (categoriesWithSlug.length) {
    this.slug = `${this.slug}-${categoriesWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
