const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    pickupDate: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    notes: {
      type: String,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "ready",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);
