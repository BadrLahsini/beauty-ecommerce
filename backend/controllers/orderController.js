import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingUser,
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    comments,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    let order = new Order({
      shippingUser,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      comments,
    });
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        let token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        order.user = user._id;
      } catch (error) {
        console.error(error);
      }
    }
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/cancel
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  await Order.deleteOne({ _id: req.params.id });
  res.status(200);
  res.send({
    message: "ordre annule",
  });
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToSent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isSent = true;
    order.sentAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToOrdered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isOrdered = true;
    order.orderedAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const resetOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isOrdered = false;
    order.isSent = false;
    order.isDelivered = false;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product")
    .limit(pageSize)
    .sort({ _id: -1 });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.page) || 1;
  const count = await Order.countDocuments();
  const orders = await Order.find({})
    .populate("user", "id name")
    .populate("orderItems.product")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ _id: -1 });

  if (orders) {
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  }
});

const searchOrders = asyncHandler(async (req, res) => {
  let orders;
  switch (req.query.select) {
    case "id":
      orders = await Order.find({ _id: req.params.keyword });
      break;
    case "phone":
      orders = await Order.find({ "shippingUser.phone": req.params.keyword });
      break;
    case "email":
      orders = await Order.find({ "shippingUser.email": req.params.keyword });
      break;
    case "name":
      orders = await Order.find({
        "shippingUser.lastName": req.params.keyword,
      });
      break;
  }

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToSent,
  updateOrderToOrdered,
  deleteOrder,
  resetOrder,
  searchOrders,
};
