const Order = require("../models/Order");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const populateOrder = (query) =>
  query
    .populate("user", "name email")
    .populate("items.product");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      items,
      pickupDate,
      customerName,
      phone,
      address,
      notes,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must include at least one item",
      });
    }

    const orderItems = items.map((item) => {
      const quantity = Number(item.quantity);

      return {
        product: item.product || item.productId,
        quantity: Number.isFinite(quantity) ? quantity : 1,
      };
    });

    const hasInvalidItem = orderItems.some(
      (item) =>
        !mongoose.Types.ObjectId.isValid(item.product) ||
        item.quantity < 1
    );

    if (hasInvalidItem) {
      return res.status(400).json({
        message: "Order contains invalid items",
      });
    }

    const productIds = [
      ...new Set(
        orderItems.map((item) => item.product.toString())
      ),
    ];

    const products = await Product.find({
      _id: {
        $in: productIds,
      },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        message: "One or more products were not found",
      });
    }

    const productsById = new Map(
      products.map((product) => [
        product._id.toString(),
        product,
      ])
    );

    const totalPrice = orderItems.reduce((sum, item) => {
      const product = productsById.get(
        item.product.toString()
      );

      return sum + product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      pickupDate,
      customerName,
      phone,
      address,
      notes,
      totalPrice,
    });

    const populatedOrder = await populateOrder(
      Order.findById(order._id)
    );

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET MY ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await populateOrder(
      Order.find({
        user: req.user.id,
      }).sort({ createdAt: -1 })
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await populateOrder(
      Order.find().sort({ createdAt: -1 })
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "ready",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    const updatedOrder = await order.save();
    const populatedOrder = await populateOrder(
      Order.findById(updatedOrder._id)
    );

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
