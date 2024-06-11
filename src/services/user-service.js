const UserRepository=require("../repository/user-repository");

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        console.log("req body in service layer ",data)
        try{
            const res=await this.userRepository.create(data);
            return res;
        }catch(err){
            console.log("error happened at user service layer, ",err);
            throw err;
        }
    }
}

module.exports=UserService