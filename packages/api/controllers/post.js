const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const Post = require('../models/post');
const Comment = require('../models/comment');
const { validatePostInput, validateCommentInput } = require('../validations/post');

const multerOptions = {
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2mb
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  },
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).select(['-comments']).populate('category').exec();
  if (!post) return res.status(400).json({ success: false, errors: { message: 'Post not found' } });
  return res.status(200).json({ success: true, post });
};

exports.getPostPublishedComments = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const args = { post: req.params.postId, published: true };
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

exports.getPostUnPublishedComments = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const args = { post: req.params.postId, published: false };
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

exports.getPublishedPosts = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const postsPromise = Post.find({ published: true }).select(['-comments']).populate('category')
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

exports.getUnPublishedPosts = async (req, res) => {
  console.log(req.params.page)
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const postsPromise = Post.find({ published: false }).select(['-comments']).populate('category')
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

exports.createPost = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
    user: req.user.id,
    category: req.body.categoryId,
  });

  await newPost.save();
  return res.status(200).json({ success: true, post: newPost });
};

exports.createAndPublishPost = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
    user: req.user.id,
    published: true,
  });

  await newPost.save();
  return res.status(200).json({ success: true, post: newPost });
};

exports.deletePost = async (req, res) => {
  await Post.findOneAndDelete({ slug: req.params.slug }).exec();
  return res.status(200).json({ success: true });
};

exports.updatePost = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const updatedPost = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true, runValidators: true },
  ).select(['-comments']).populate('category').exec();
  return res.status(200).json({ success: true, post: updatedPost });
};

exports.publishPost = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const updatedPost = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    { published: true },
    { new: true, runValidators: true },
  ).select(['-comments']).populate('category').exec();
  return res.status(200).json({ success: true, post: updatedPost });
};

exports.likePost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(400).json({ success: false, errors: { message: 'Post not found' } });

  const alreadyLiked = post.likes.filter((like) => like.user.toString() === req.user.id);
  if (alreadyLiked.length > 0) {
    // dislike
    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Splice out of array
    post.likes.splice(removeIndex, 1);
  } else {
    // like
    post.likes.unshift({ user: req.user.id });
  }
  await post.save();
  return res.status(200).json({ success: true });
};

exports.addComment = async (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(400).json({ success: false, errors: { message: 'Post not found' } });
  const newComment = new Comment({
    user: req.user.id,
    post: post.id,
    body: req.body.body,
  });

  await newComment.save();
  post.comments.unshift(newComment.id);
  await post.save();
  return res.status(200).json({ success: true });
};

exports.deleteComment = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(400).json({ success: false, errors: { message: 'Post not found' } });

  await Comment.findByIdAndDelete(req.params.commentId);
  return res.status(200).json({ success: true });
};

exports.updateComment = async (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(400).json({ success: false, errors: { message: 'Post not found' } });

  const comment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    req.body,
    { new: true, runValidators: true },
  );
  return res.status(200).json({ success: true, comment });
};
