const Request = require('../models/request');

exports.getRequests = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const requestsPromise = Request.find().populate('user')
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Request.count();

  const [requests, count] = await Promise.all([requestsPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!requests.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }

  return res.status(200).json({
    success: true,
    requests,
    page,
    pages,
    count,
  });
};

exports.deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.params.requestId).exec();
  return res.status(200).json({ success: true });
};

exports.createRequest = async (req, res) => {
  const newRequest = new Request({
    user: req.user.id,
  });

  await newRequest.save();
  return res.status(200).json({ success: true, request: newRequest });
};
