const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      sucess: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email: email })
  if (user)
    throw new Error('User has already existed');
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mes: newUser ? 'Register is succesful. Please login' : 'Some thing went wrong'
    });
  }
});
module.exports = {
  register,
};
