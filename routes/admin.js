const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/edit-product/:id", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

router.get("/products", getProducts);

router.post("/add-product", postAddProduct);

module.exports = router;
