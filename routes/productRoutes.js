const express = require("express");

const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);

router.post("/", protect, createProduct);

router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);

module.exports = router;