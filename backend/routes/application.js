const router = require("express").Router();
const Product = require("../models/product.model");
const recursiveFsUnlink = require("../utils/recursive-fs-unlink");

router.route("/reset").delete((_req, res) => {
  console.log("Deleting all products");
  return Product.deleteMany({})
    .then(() => recursiveFsUnlink("static"))
    .then(() => res.json(`All products deleted.`))
    .catch((err) => {
      console.error(`Error: Products deletion failed - ${err}`);
      return res.status(400).json("Failed to reset all products");
    });
});

module.exports = router;
