const fs = require("fs");
const path = require("path");

const pth = path.join(require.main.path, "data", "cart.json");
let cart = { products: [], totalPrice: 0 };

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(pth, (err, data) => {
      if (!err) {
        cart = JSON.parse(data);
      }
      const product = cart.products.find((prod) => prod.id === id);
      let upProd;
      if (product) {
        upProd = { ...product, qty: product.qty + 1 };
        cart.products = [...cart.products, upProd];
        cart.products[cart.products.indexOf(product)] = upProd;
      } else {
        upProd = { id: id, qty: 1 };
        cart.products = [...cart.products, upProd];
      }
      cart.totalPrice = cart.totalPrice + price;
      fs.writeFile(pth, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static removeProduct(id, price) {
    fs.readFile(pth, (err, data) => {
      if (err) {
        return;
      }
      cart = JSON.parse(data);
      const upCart = { ...cart };
      const product = upCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      upCart.products = upCart.products.filter((prod) => prod.id !== id);
      upCart.totalPrice = upCart.totalPrice - price * product.qty;
      fs.writeFile(pth, JSON.stringify(upCart), (err) => console.log(err));
    });
  }

  static getCart(cbf) {
    fs.readFile(pth, (err, data) => {
      if (err) {
        cbf(null);
      } else {
        cbf(JSON.parse(data));
      }
    });
  }
};
