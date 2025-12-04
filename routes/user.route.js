const express=require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {getAllUsers,toggleUserIsBlocked, getUserAddress,saveNewAddress}=require("../controllers/user.controller")

router.get('/allusers',authenticate,authorize('admin'),getAllUsers);
router.get('/getuseraddress',authenticate,authorize('client'),getUserAddress)
router.post('/addaddress',authenticate,authorize('client'),saveNewAddress)
router.post('/:id/toggleIsBlockedUser',authenticate,authorize('admin'),toggleUserIsBlocked);

module.exports= router;
