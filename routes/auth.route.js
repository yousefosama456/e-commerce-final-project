const express= require('express');
const { login ,signup,createAdmin} = require('../controllers/auth.controller');
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize}= require('../middlewares/role.middleware')
const router= express.Router();
router.post('/login', login);
router.post('/signup', signup);


// router.post('/sign',authenticate, authorize('admin'),(req,res)=>{
//     res.send ("you are authenticated and authorized")
// });
router.post("/addadmin",authenticate,authorize('admin'),createAdmin)

module.exports= router;

