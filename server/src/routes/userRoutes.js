const express = require('express');
const router = express.Router();
const {signUpUser,loginUser, getSellerProducts,addSellerProducts,deleteSellerProducts,updateSellerProduct,
    getAllSellerProducts,addToCart,getMyCart, removeCart,getProductById} = require('../controllers/userController');
const {validateUserSignup,handleValidationErrors, validateLogin, validateAddProducts} = require("../middleware/validationMiddleware");

router.post('/signup',validateUserSignup,handleValidationErrors,signUpUser);
router.post('/login',validateLogin, loginUser);
router.get("/seller/getproducts/:userId",getSellerProducts);
router.get("/seller/getallproducts",getAllSellerProducts);
router.get("/seller/getproductbyid/:productId",getProductById);
router.post("/seller/addProducts/:userId",validateAddProducts,handleValidationErrors,addSellerProducts);
router.put("/seller/updateproduct/:productId/:userId",updateSellerProduct)
router.delete("/seller/deleteproduct/:id",deleteSellerProducts);
router.get("/buyer/getmycart/:userId",getMyCart);
router.post("/buyer/addtocart",addToCart);
router.delete("/buyer/removecart/:id",removeCart);

module.exports = router;