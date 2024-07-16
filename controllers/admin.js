const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      products: products,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imgUrl, description, price } = req.body;
  const product = new Product(title, imgUrl, description, price);
  product.save();
  res.redirect("/");
};
