
const authParameterValidateMiddleware=(req,res,next)=>{

    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data:{},
            success:false,
            message:"Missing email or password from body",
            err:"Unable to login/signup"
        })
    }
    next();
}

const validateIsAdmin=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).json({
            data:{},
            success:false,
            message:"Missing userId from body",
            err:"Unable to check for admin access"
        })
    }
    next();
}

module.exports={
    authParameterValidateMiddleware,
    validateIsAdmin
}