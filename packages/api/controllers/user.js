const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getUsers = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const usersPromise = User.find().select(['-password'])
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = User.count();

  const [users, count] = await Promise.all([usersPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!users.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }

  return res.status(200).json({
    success: true,
    users,
    page,
    pages,
    count,
  });
};
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.userId).select(['-password']).exec();
  if (!user) return res.status(400).json({ success: false, errors: { message: 'User not found' } });
  return res.status(200).json({ success: true, user });
};

exports.getUsersPublishedPosts = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const postsPromise = Post.find({ published: true, user: req.params.userId }).select(['-comments'])
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Post.count();

  const [posts, count] = await Promise.all([postsPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!posts.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }

  return res.status(200).json({
    success: true,
    posts,
    page,
    pages,
    count,
  });
};

exports.getUsersUnPublishedPosts = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const postsPromise = Post.find({ published: false, user: req.params.userId }).select(['-comments'])
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Post.count();

  const [posts, count] = await Promise.all([postsPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!posts.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }

  return res.status(200).json({
    success: true,
    posts,
    page,
    pages,
    count,
  });
};
exports.getUsersPublishedComments = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const args = { post: req.params.postId, user: req.params.userId, published: true };
  const commentsPromise = Comment.find(args).skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Comment.count(args);

  const [comments, count] = await Promise.all([commentsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!comments.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }
  return res.status(200).json({
    success: true,
    comments,
    page,
    pages,
    count,
  });
};

exports.getUsersUnPublishedComments = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const args = { post: req.params.postId, user: req.params.userId, published: false };
  const commentsPromise = Comment.find(args).skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Comment.count(args);

  const [comments, count] = await Promise.all([commentsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!comments.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }
  return res.status(200).json({
    success: true,
    comments,
    page,
    pages,
    count,
  });
};
exports.deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.userId }).exec();
  return res.status(200).json({ success: true });
};
exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true, runValidators: true },
  ).select(['-password']);
  return res.status(200).json({ success: true, user: updatedUser });
};
