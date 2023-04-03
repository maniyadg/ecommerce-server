const express = require ('express');
const { getOrders, getAllOrders, orderStatus } = require('../controllers/orderController');
const { isAuth, isAdmin } = require('../utils/authorisation');

const router = express.Router();


//orders
router.get("/orders", isAuth, getOrders);

//all orders
router.get("/all-orders", isAuth, isAdmin, getAllOrders);

// order status update
router.put(
  "/order-status/:orderId",
  isAuth,
  isAdmin,
  orderStatus
);


module.exports = router