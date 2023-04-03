const express = require ('express');
const { checkout, paymentVerification } = require('../controllers/paymentController');
const { isAuth } = require('../utils/authorisation')

const router = express.Router();

router.post('/checkout' , checkout)

router.post("/paymentverification" , isAuth , paymentVerification );

module.exports = router;