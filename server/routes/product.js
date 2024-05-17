const router = require("express").Router();

const ctrl = require("../controllers/product");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.use([verifyAccessToken, isAdmin]);

router.get("/", ctrl.getAllProduct);
router.post("/create", ctrl.addProduct);
router.delete("/", ctrl.deleteProductByAdmin);
router.put("/", ctrl.updateProduct);

module.exports = router;
