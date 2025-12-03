const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addProduct, deleteProduct, getProducts,getProductsAdmin,editProduct,getProductsBySubCategory}= require('../controllers/product.controller')
const {upload}= require('../middlewares/upload.middleware')


router.post('/addproduct',authenticate,authorize('admin'),upload.single("img"),addProduct)
router.get('/:id/getproductsbysubcategory',getProductsBySubCategory)
router.get('',getProducts)
router.get ('/getproductadmin',authenticate,authorize('admin'),getProductsAdmin)
router.put('/:id/editproduct',authenticate,authorize('admin'),upload.single("img"),editProduct)
router.post ('/:id/deleteproduct',authenticate,authorize('admin'),deleteProduct)
module.exports= router;

