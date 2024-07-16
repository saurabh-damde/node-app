const fs = require("fs");
const path = require("path");

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

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProducts((products) => {
      products.push(this);
      fs.writeFile(pth, JSON.stringify(products), (err) => console.log(err));
    });
  }

  static fetchAll(cbf) {
    getProducts(cbf);
  }
};