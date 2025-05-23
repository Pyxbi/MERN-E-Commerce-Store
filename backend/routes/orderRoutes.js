import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";


router
  .route("/")
  .post( createOrder)
  .get(getAllOrders);

router.route("/mine").get( getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get( findOrderById);
router.route("/:id/pay").put(markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(markOrderAsDelivered);

export default router;
