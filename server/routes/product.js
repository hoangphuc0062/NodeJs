const router = require("express").Router();

const ctrl = require("../controllers/product");

const { verifyAccessToken, isAdmin } = require("../middlewares/vertifyToken");

router.use([verifyAccessToken, isAdmin]);

router.get("/:pid", ctrl.getProduct);
router.get("/", ctrl.getAllProduct);
router.post("/create", ctrl.addProduct);
router.delete("/:pid", ctrl.deleteProductByAdmin);
router.put("/:pid", ctrl.updateProduct);

module.exports = router;
