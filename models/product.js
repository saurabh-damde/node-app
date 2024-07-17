const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const pth = path.join(require.main.path, "data", "products.json");

const getProducts = (cbf) => {
  fs.readFile(pth, (err, data) => {
    if (err) {
      cbf([]);
    } else {
      cbf(JSON.parse(data));
    }
  });
};

const getUniqueId = (products) => {
  let id;
  let flag = false;
  while (!flag) {
    id = Math.floor(Math.random() * 100);
    flag = !products.find((item) => item.id === id);
  }
  return id;
};

module.exports = class Product {
  constructor(id, title, imgUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProducts((products) => {
      if (this.id) {
        const product = products.find((prod) => prod.id === this.id);
        const upProds = [...products];
        upProds[products.indexOf(product)] = this;
        fs.writeFile(pth, JSON.stringify(upProds), (err) => console.log(err));
      } else {
        this.id = getUniqueId(products);
        products.push(this);
        fs.writeFile(pth, JSON.stringify(products), (err) => console.log(err));
      }
    });
  }

  static deleteById(id) {
    getProducts((products) => {
      const product = products.find((prod) => prod.id === id);
      const upProds = products.filter((prod) => prod.id !== id);
      fs.writeFile(pth, JSON.stringify(upProds), (err) => {
        if (!err) {
          Cart.removeProduct(id, +product.price);
        }
      });
    });
  }

  static fetchAll(cbf) {
    getProducts(cbf);
  }

  static findById(id, cbf) {
    getProducts((products) => {
      cbf(products.find((prod) => prod.id === id));
    });
  }
};
