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

module.exports={
    create
}