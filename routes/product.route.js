const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addProduct, deleteProduct}= require('../controllers/product.controller')
const {upload}= require('../middlewares/upload.middleware')


router.post('/addproduct',authenticate,authorize('admin'),upload.single("img"),addProduct)
router.post ('/:id/deleteproduct',authenticate,authorize('admin'),deleteProduct)
module.exports= router;

