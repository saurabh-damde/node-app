const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  Product.findById(id, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode,
    });
  });
};

exports.postEditProduct = (req, res, nxt) => {
  const { id, title, imgUrl, description, price } = req.body;
  const product = new Product(id, title, imgUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, nxt) => {
  const id = req.body.id;
  Product.deleteById(id);
  res.redirect("/admin/products");
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
  const product = new Product(null, title, imgUrl, description, price);
  product.save();
  res.redirect("/");
};
