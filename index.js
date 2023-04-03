const express = require("express");
const colors = require('colors')
const dotenv = require("dotenv").config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require ('cors')
const Razorpay = require('razorpay')
const db = require("./db/connection");
const authRoute = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoutes')
const productRoute = require('./routes/productRoutes')
const paymentRoute = require('./routes/paymentRoutes')
const orderRoute = require('./routes/orderRoutes')
// DB connection
db()

// rest object
const app = express();

// middelwares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser());



 
// routes
app.use('/api' , authRoute)
app.use('/api/category' , categoryRoute)
app.use('/api/product' , productRoute)
app.use('/api/payment' , paymentRoute)
app.use('/api' , orderRoute)


app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });


//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`.bgCyan
      .white
  );
});

