const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, adminMiddleware, createProduct);

router.delete("/:id", protect, adminMiddleware, deleteProduct);
router.put("/:id", protect, adminMiddleware, updateProduct);
router.patch("/:id", protect, adminMiddleware, updateProduct);

module.exports = router;
