const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) throw new Error("User has already existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Register is succesful. Please login"
        : "Some thing went wrong",
    });
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }

  // refresh token => cap moi access Token
  // access Token : xac thuc nguoi dung , phan quyen nguoi dung
  const response = await User.findOne({ email: email });
  //plain object
  if (response && (await response.isCorrectPassword(password))) {
    // tach pw và role ra khỏi response
    const { password, role, ...userData } = response.toObject();
    // tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    // tạo refreshToken
    const refreshToken = generateRefreshToken(response._id);
    // Lưu refresh token vào database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials !");
  }
});
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select(
    "-refreshToken -password -role "
  );
  return res.status(200).json({
    success: false,
    rs: user ? user : "User not Found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookie
  const cookie = req.cookies;

  // Check xem nó có tồn tại hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No Refresh Access Token");
  // Check token có hợp lệ hay không
  // rs = result
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token is not matched ",
  });
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // ktr có cookie tồn tại chưa
  if (!cookie || !cookie.refreshToken)
    throw new Error("No Refresh Token in cookies");
  // xóa refresh token ở db
  await User.findOneAndUpdate(
    {
      refreshToken: cookie.refreshToken,
    },
    { refreshToken: "" },
    { new: true }
  );
  // xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

// Client gửi email
// Server check mail có hợp lệ hay k => hợp lệ gửi mail + kèm theo link (password change token)
// Client Check mail click vào link đã gửi
// Client gửi API kèm theo token
// Check token có giống với token mà serve gửi hay k
// Change Password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  <a href=${process.env.URL_SERVER}/api/users/reset-password/${resetToken}>Click here</a>`;

  const rs = await sendMail(email, html);
  return res.status(200).json({
    success: true,
    rs,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExprires: { $gt: Date.now() },
  });
  // lưu vào db
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExprires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? " Update password" : "Something went wrong",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
};
