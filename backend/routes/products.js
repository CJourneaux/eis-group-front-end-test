const { v4: randomUuid } = require("uuid");
const router = require("express").Router();
var Product = require("../models/product.model");

var multer = require("multer");
const storagePolicy = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, "static/images"),
  filename: (_req, file, callback) => {
    const MIMETYPE_TO_EXTENSION = {
      "vnd.microsoft.icon": "ico",
      "svg+xml": "svg",
    };
    const imageMimetype = file.mimetype.split("/").pop();
    const imageExtension =
      MIMETYPE_TO_EXTENSION[imageMimetype] || imageMimetype;
    return callback(null, `${randomUuid()}.${imageExtension}`);
  },
});
var upload = multer({
  storage: storagePolicy,
});

router.route("/").get(upload.none(), (_req, res) => {
  console.log("Getting all products");
  Product.find()
    .then((products) => {
      const productsWithPublicImagePaths = products.map((product) => {
        product.imagePath = product.imagePath.replace(/^static/, "/public");
        return product;
      });
      return res.json(productsWithPublicImagePaths);
    })
    .catch((err) => {
      console.error(`Error: Products not found - ${err}`);
      res.status(404).json(`Failed to get all products`);
    });
});

router.route("/:id").delete(upload.none(), (req, res) => {
  const productId = req.params.id;
  console.log(`Deleting product ${productId}`);
  Product.findByIdAndDelete(productId)
    .then(({ imagePath }) =>
      require("fs").unlink(imagePath, (err) => {
        if (err) throw err;
      })
    )
    .then(() => res.json(`Product ${productId} deleted.`))
    .catch((err) => {
      console.error(`Error: Product deletion failed - ${err}`);
      res.status(400).json(`Failed to delete product ${productId}`);
    });
});

router.route("/add").post(upload.single("productImage"), (req, res) => {
  try {
    const imagePath = req.file.path;
    const name = req.body.name;
    const colour = req.body.colour;
    const stock = Number(req.body.stock);
    const price = Number(req.body.price);
    console.log(
      `Adding product ${name} and uploading file ${req.file.filename}`
    );

    const newProduct = new Product({
      name,
      imagePath,
      colour,
      stock,
      price,
    });
    return newProduct
      .save()
      .then(() => res.status(201).json(`Product added!`))
      .catch((err) => {
        require("fs").unlink(imagePath, (err) => {
          if (err) throw err;
        });
        console.error(`Error: Product creation failed - ${err}`);
        const defaultErrorMessage = `Error: Failed to create new product ${newProduct}`;
        if (err.code == 11000) {
          res
            .status(403)
            .json(`${defaultErrorMessage} - Product already exists`);
        } else {
          res.status(400).json(defaultErrorMessage);
        }
        return res;
      });
  } catch (error) {
    return res
      .status(400)
      .json(
        `Error: Invalid product properties received. Expected an image file, a name, a colour, a stock and a price.`
      );
  }
});

module.exports = router;
