import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToOrdered,
  updateOrderToSent,
  getMyOrders,
  getOrders,
  deleteOrder,
  resetOrder,
  searchOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delete").post(protect, deleteOrder);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id/send").put(protect, admin, updateOrderToSent);
router.route("/:id/order").put(protect, admin, updateOrderToOrdered);
router.route("/:id/reset").put(protect, admin, resetOrder);
router.route("/:keyword/search").get(protect, admin, searchOrders);

export default router;
