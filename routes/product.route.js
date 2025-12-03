const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addProduct, deleteProduct, getProducts,getProductsAdmin,editProduct,getProductsBySubCategory,
    getProductDetailsById,getProductsNewArrival,getProductsBestSeller}= require('../controllers/product.controller')
const {upload}= require('../middlewares/upload.middleware')
const filterProductsBySubCategory = require('../middlewares/filterProductsBySubCategory.middleware')
const paginate= require('../middlewares/pagination.middleware')
const Product=require('../models/product.model')


router.post('/addproduct',authenticate,authorize('admin'),upload.single("img"),addProduct)
router.get('/:id/getproductsbysubcategory',filterProductsBySubCategory,paginate(Product),getProductsBySubCategory)
router.get('/:id/getproductdetailsbyid',getProductDetailsById)
router.get('/newarrival',getProductsNewArrival)
router.get('/bestseller',getProductsBestSeller)


// router.get('',getProducts)
router.get ('/getproductadmin',authenticate,authorize('admin'),getProductsAdmin)
router.put('/:id/editproduct',authenticate,authorize('admin'),upload.single("img"),editProduct)
router.post ('/:id/deleteproduct',authenticate,authorize('admin'),deleteProduct)
module.exports= router;

