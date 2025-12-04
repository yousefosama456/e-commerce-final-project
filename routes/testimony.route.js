const express= require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const{addTestimony,getAllTestimonies,getApprovedTestimonies,approveTestimony}=require('../controllers/testimony.controller')

router.post('/add',authenticate,authorize('client'),addTestimony);
router.get('/all',authenticate,authorize('admin'),getAllTestimonies);
router.get('/approved', getApprovedTestimonies);
router.patch('/approve/:id', authenticate, authorize('admin'), approveTestimony)
module.exports=router;
