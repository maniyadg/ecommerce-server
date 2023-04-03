const orderModel = require('../models/orderModel')
const crypto = require('crypto')
const Razorpay = require('razorpay')

// razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRETKEY,
});

const checkout = async (req, res) => {

  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error :" , error)
  }
}

const paymentVerification = async (req, res) => {

  try {
    const { cart, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRETKEY)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here

      await orderModel.create({
        products: cart,
        buyer: req.user._id,
        payment: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        }

      });

      console.log(razorpay_order_id)


      res.status(200).json({
        success: true,
      });
      // res.redirect(
      //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      // );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log("error :" , error)
  }
};


module.exports = { checkout, paymentVerification }