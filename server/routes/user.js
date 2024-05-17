const router = require("express").Router();

const ctrl = require("../controllers/user");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/current", verifyAccessToken, ctrl.getCurrent);
router.post("/refreshtoken", ctrl.refreshAccessToken);
router.get("/logout", ctrl.logout);
router.get("/forgotpassword", ctrl.forgotPassword);
router.put("/resetpassword", ctrl.resetPassword);
// Trong ngoặc vuông để phân biệt middleware
router.get("/", [verifyAccessToken, isAdmin], ctrl.getUsers);
router.delete("/", [verifyAccessToken, isAdmin], ctrl.deleteUser);
router.put("/current", [verifyAccessToken], ctrl.updateUser);
router.put("/:userId", [verifyAccessToken, isAdmin], ctrl.updateUserByAdmin);

module.exports = router;

// CRUD | Create - read - update - delete | POST - GET - PUT - DELETE
// Create (POST) + PUT - body không lộ
// Get + Delete - query // bị lộ thông tin
