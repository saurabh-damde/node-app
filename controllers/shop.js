const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = (req, res, nxt) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      products: products,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      products: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

exports.getCart = (req, res, nxt) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      let cartProds = [];
      for (let product of products) {
        const cartProd = cart.products.find((prod) => prod.id === product.id);
        if (cartProd) {
          cartProds.push({ product: product, qty: cartProd.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProds,
      });
    });
  });
};

exports.postCart = (req, res, nxt) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.addProduct(id, +product.price);
    res.redirect("/cart");
    res.render("shop/cart", {
      pageTitle: "Cart",
      path: "/cart",
    });
  });
};

exports.postRemoveItem = (req, res, nxt) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.removeProduct(id, +product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, nxt) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, nxt) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
