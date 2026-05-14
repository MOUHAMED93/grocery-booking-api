const Product = require("../models/Product");


// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
    } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      image,
      description,
      stock,
      available,
      isAvailable,
    } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (name !== undefined) {
      product.name = name;
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (image !== undefined) {
      product.image = image;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    if (available !== undefined) {
      product.isAvailable = available;
    }

    if (isAvailable !== undefined) {
      product.isAvailable = isAvailable;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
