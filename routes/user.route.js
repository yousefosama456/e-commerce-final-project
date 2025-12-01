const express=require('express');
const router= express.Router();
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const {getAllUsers,toggleUserIsBlocked}=require("../controllers/user.controller")

router.get('/allusers',authenticate,authorize('admin'),getAllUsers);
router.post('/:id/toggleIsBlockedUser',authenticate,authorize('admin'),toggleUserIsBlocked);

module.exports= router;
