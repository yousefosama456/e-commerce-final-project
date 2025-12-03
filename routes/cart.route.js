const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addCart,getUserCart,updateQuantity,removeItemFromCart }=require("../controllers/cart.controller")

router.post('/addcart',authenticate,authorize('client'),addCart);
router.get('/getusercart',authenticate,authorize('client'),getUserCart);
router.put("/updatequantity",authenticate,authorize("client"), updateQuantity);
router.post('/removeitemfromusercart',authenticate,authorize('client'),removeItemFromCart)


module.exports=router
