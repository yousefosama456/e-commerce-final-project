const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addCategory,changeDeleteFlagCategory, getCategory, editCategory,getCategoriesAdmin}= require('../controllers/category.controller')


router.post('/addcategory',authenticate,authorize('admin'),addCategory);
router.get('',getCategory);

router.put('/:id/editcategory',authenticate,authorize('admin'),editCategory);
router.post('/:id/changecategorydeleteflag',authenticate,authorize('admin'),changeDeleteFlagCategory)

module.exports=router