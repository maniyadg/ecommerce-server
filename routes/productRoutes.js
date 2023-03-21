const express = require ('express');
const { createProduct, updateProduct, getProduct, getSingleProduct, productPhoto, deleteProduct, productFilter, productCount, productList, searchProduct, realtedProduct, productCategory } = require('../controllers/productController');
const { isAuth, isAdmin } = require('../utils/authorisation');
const formidable = require('express-formidable')

const router = express.Router();

//routes
router.post(
    "/create-product",
    isAuth,
    isAdmin,
    formidable(),
    createProduct
  );

  router.put(
    "/update-product/:pid",
    isAuth,
    isAdmin,
    formidable(),
    updateProduct
  );
  
  //get products
  router.get("/get-product", getProduct);
  
  //single product
  router.get("/get-product/:slug", getSingleProduct);
  
  //get photo
  router.get("/product-photo/:pid", productPhoto);
  
  //delete rproduct
  router.delete("/delete-product/:pid", deleteProduct);

  //filter product
router.post("/product-filters", productFilter);

//product count
router.get("/product-count", productCount);

//product per page
router.get("/product-list/:page", productList);
  
//search product
router.get("/search/:keyword", searchProduct);

//similar product
router.get("/related-product/:pid/:cid", realtedProduct);

//category wise product
router.get("/product-category/:slug", productCategory);

module.exports = router;