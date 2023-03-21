const express = require ('express');
const { updateCategory, category, singleCategory, deleteCategory, createCategory } = require('../controllers/categoryController');
const { isAuth, isAdmin } = require('../utils/authorisation');


const router = express.Router();

//routes
// create category
router.post(
    "/create-category",
    isAuth,
    isAdmin,
    createCategory
  );

//update category
router.put(
    "/update-category/:id",
    isAuth,
    isAdmin,
    updateCategory
  );
  
  //getALl category
  router.get("/get-category", category);
  
  //single category
  router.get("/single-category/:slug", singleCategory);
  
  //delete category
  router.delete(
    "/delete-category/:id",
    isAuth,
    isAdmin,
    deleteCategory
  );

module.exports = router;