const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {addSubCategory,changeDeleteFlagSubCategory,getSubCategory}= require('../controllers/sub-categoy.controller')


router.post('/addsubcategory',authenticate,authorize('admin'),addSubCategory)
router.get('',getSubCategory)
router.post('/:id/changesubcategorydeleteflag',authenticate,authorize('admin'),changeDeleteFlagSubCategory)

module.exports=router