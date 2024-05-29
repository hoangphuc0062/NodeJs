const router = require("express").Router();

const ctrl = require("../controllers/category");

router.get("/", ctrl.getAllCategory);
const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.get("/list", [verifyAccessToken, isAdmin], ctrl.getAllCategory);
router.post("/create", [verifyAccessToken, isAdmin], ctrl.addCategory);
router.delete("/:_id", [verifyAccessToken, isAdmin], ctrl.deleteCategory);
router.put("/:_id", [verifyAccessToken, isAdmin], ctrl.updateCategory);

module.exports = router;
