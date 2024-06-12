const {User}=require("../models/index")

class UserRepository{

    async create(data) {
        console.log("data in repo is: ",data)
        try{
            const res=await User.create(data);
            return res;
        }catch(err){
            console.log("error happened at user repository");
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
}

module.exports=UserRepository