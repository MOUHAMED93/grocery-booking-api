const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, adminMiddleware, getAllOrders);

router.patch(
  "/:id/status",
  protect,
  adminMiddleware,
  updateOrderStatus
);

router.patch(
  "/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);

router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;
