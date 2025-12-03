const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addCategory,changeDeleteFlagCategory, getCategories, editCategory,getCategoriesAdmin}= require('../controllers/category.controller')


router.post('/addcategory',authenticate,authorize('admin'),addCategory);
router.get('',getCategories);
router.get('/getcategoriesadmin',authenticate,authorize('admin'),getCategoriesAdmin);

router.put('/:id/editcategory',authenticate,authorize('admin'),editCategory);
router.post('/:id/changecategorydeleteflag',authenticate,authorize('admin'),changeDeleteFlagCategory)

module.exports=router