const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addCart}=require("../controllers/cart.controller")

router.post('/addcart',authenticate,authorize('client'),addCart);


module.exports=router
