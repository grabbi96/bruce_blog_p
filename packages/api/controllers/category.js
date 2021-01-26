const Category = require('../models/category');
const { validateCategoryInput } = require('../validations/category');

exports.getCategory = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  if (!category) return res.status(400).json({ success: false, errors: { message: 'Category not found' } });
  return res.status(200).json({ success: true, category });
};

exports.getCategories = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const categoryPromise = Category.find().skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Category.count();

  const [categories, count] = await Promise.all([categoryPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!categories.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }
  return res.status(200).json({
    success: true,
    categories,
    page,
    pages,
    count,
  });
};

exports.createCategory = async (req, res) => {
  const { errors, isValid } = validateCategoryInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  await newCategory.save();
  return res.status(200).json({ success: true, category: newCategory });
};

exports.deleteCategory = async (req, res) => {
  await Category.findOneAndDelete({ slug: req.params.slug }).exec();
  return res.status(200).json({ success: true });
};

exports.updateCategory = async (req, res) => {
  const { errors, isValid } = validateCategoryInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const updatedCategory = await Category.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true, runValidators: true },
  ).select(['-comments']).exec();
  return res.status(200).json({ success: true, post: updatedCategory });
};
