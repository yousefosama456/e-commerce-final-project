const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addSubCategory,changeDeleteFlagSubCategory,getSubCategory,getSubCategoryAdmin,editSubCategory}= require('../controllers/sub-categoy.controller')


router.post('/addsubcategory',authenticate,authorize('admin'),addSubCategory)
router.get('',getSubCategory)
router.put('/:id/editsubcategory',authenticate,authorize('admin'),editSubCategory)
router.get('/getsubcategoryadmin',authenticate,authorize('admin'),getSubCategoryAdmin)
router.post('/:id/changesubcategorydeleteflag',authenticate,authorize('admin'),changeDeleteFlagSubCategory)

module.exports=router