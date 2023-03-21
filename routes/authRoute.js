const express = require ('express');
const { register , signin, testController, forgotPassword, updateProfile } = require('../controllers/authController');
const { isAuth, isAdmin } = require('../utils/authorisation');


const router = express.Router();

// Register Routes
router.post('/register' ,register);

// Login Routes
router.post('/signin' , signin);

router.get('/testcontroller' , isAuth , isAdmin , testController);


//protected user route auth
router.get("/user-auth", isAuth, (req, res) => {
    res.status(200).send({ ok: true });
  });


  //protected admin route auth
router.get("/admin-auth", isAuth, isAdmin , (req, res) => {
  res.status(200).send({ ok: true });
});


  //Forgot Password
router.post("/forgot-password", forgotPassword);

//update profile
router.put("/profile", isAuth, updateProfile);

module.exports = router;