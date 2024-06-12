const UserService=require("../services/user-service");

const userService=new UserService();
const create=async(req,res)=>{
    try{
        const data=await userService.create({
            email:req.body.email,
            password:req.body.password
        })
        return res.status(201).json({
            data:data,
            success:true,
            message:"successfully created the user",
            err:{}
        })
    }catch(err){
       return res.status(500).json({
            data:{},
            success:false,
            message:"unable to create user",
            err:err
        })
    }
}

const signIn=async(req,res)=>{
    try{
        const response=await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data:response,
            success:true,
            message:"SignIn success",
            err:{}
        })
    }catch(err){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to signIn",
            err:err
        })
    }
}

const isAuthenticated=async (req,res)=>{
    try{
        const token=req.headers['x-access-token'];
        const response=await userService.isAuthenticated(token);//will return user id if token is valid
        return res.status(200).json({
            data:{},
            success:true,
            message:"user is authenticated",
            err:{}
        })
    }catch(err){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to authenticate",
            err:err
        })
    }
}
module.exports={
    create,
    signIn,
    isAuthenticated
}