const Product = require("../models/product");

const asyncHandler = require("express-async-handler");

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.status(200).json({
    success: products ? true : false,
    products,
  });
});
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;
  if (!name || !price || !description || !category || !imageUrl) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const product = await Product.create(req.body);
  return res.status(200).json({
    success: product ? true : false,
    mes: product ? "Create product is succesful" : "Some thing went wrong",
  });
});

const deleteProductByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const product = await Product.findByIdAndDelete(_id);
  return res.status(200).json({
    success: product ? true : false,
    mes: product ? "Delete product is succesful" : "Some thing went wrong",
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const product = await Product.findOneAndUpdate(_id, req.body);
  return res.status(200).json({
    success: product ? true : false,
    mes: product ? "Update product is succesful" : "Some thing went wrong",
    product,
  });
});

module.exports = {
  getAllProduct,
  addProduct,
  deleteProductByAdmin,
  updateProduct,
};
