const express=require("express");


const {authValidateMiddleware}=require("../../middlewares/index")
const router=express.Router();
const userController=require("../../controllers/user-controller");

router.post('/signup',authValidateMiddleware.authParameterValidateMiddleware,userController.create);

router.post('/signin',authValidateMiddleware.authParameterValidateMiddleware,userController.signIn);

router.get('/isauthenticate',userController.isAuthenticated);
module.exports=router