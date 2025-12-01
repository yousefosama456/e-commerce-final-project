const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addOrder,getAllOrder,updateOrderStatus}=require("../controllers/order.controller")

router.post('/addorder',authenticate,authorize('client'),addOrder);
router.get('',authenticate,authorize('admin'),getAllOrder)
router.put('/:id/updateOrderStatus',authenticate,authorize('admin'),updateOrderStatus)

module.exports= router;
