const ValidationError= require("../utils/validation-error");
const {User,Role}=require("../models/index");
const ClientError = require("../utils/client-error");
const {StatusCodes}=require("http-status-codes")

class UserRepository{

    async create(data) {
        // console.log("data in repo is: ",data)
        try{
            const res=await User.create(data);
            return res;
        }catch(err){
            if(err.name=="SequelizeValidationError"){
                let validationError=new ValidationError(err)
                // console.log("validation error obj is:",validationError)
                throw validationError
            }
            // console.log("error happened at user repository: ",err);
            throw err;
        }
    }

    async delete(userId){
        try{
            await User.destroy({
                where:{
                    id:userId
                }
            })
            return true;
        }catch(err){
            console.log("error happened at user repository");
            throw err;
        }
    }

    async getById(userId){
        try{
            const user=await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        }catch(err){
            console.log("error happened at user repository");
            throw err;
        }
    }
    async getByEmail(userEmail){
        try{
            const user=await User.findOne({
                where:{
                    email:userEmail
                }
            })
            if(!user){
                throw new ClientError('AttributeNotFound',
                'Invalid email sent in the request',
                'Please check the email as there is no such record with this email',
                StatusCodes.NOT_FOUND)
            }
            return user;
        }catch(err){
            
            console.log("error happened at user repository for get by email ",err);
            throw err;
        }
    }

    async isAdmin(userId){
        try{
            const user=await User.findByPk(userId);
            const adminRole=await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            })
            return await user.hasRole(adminRole);
        }catch(err){
            console.log("error happened at user repository");
            throw err;
        }
    }
}

module.exports=UserRepository