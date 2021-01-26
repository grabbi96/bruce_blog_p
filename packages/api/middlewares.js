const Post = require('./models/post');
const Comment = require('./models/comment');

exports.isAdmin = (req, res, next) => {
  console.log(req.user.role)
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, errors: { message: "You don't have permission" } });
};

exports.checkRole = (req, res, next) => {
  const { role } = req.user;
  if (role === 'visitor') {
    return res.status(403).json({
      success: false,
      errors: {
        message:
          "You don't have permission to write posts, Please contact with admin",
      },
    });
  }
  return next();
};

exports.checkPostPermission = async (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return next();
  }

  const post = await Post.findOne({ user: req.user.id });
  if (!post) {
    return res.status(403).json({
      success: false,
      errors: { message: "You don't have permission to delete this post" },
    });
  }

  return next();
};

exports.checkCommentPermission = async (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return next();
  }

  const comment = await Comment.find({ id: req.user.id });
  if (!comment) {
    return res.status(403).json({
      success: false,
      errors: { message: "You don't have permission to delete this comment" },
    });
  }

  return next();
};
