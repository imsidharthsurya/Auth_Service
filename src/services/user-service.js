const UserRepository=require("../repository/user-repository");
var jwt = require('jsonwebtoken');
const {JWT_KEY}=require("../config/serverConfig")
const bcrypt = require('bcrypt');
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

    async signIn(email,password){
        try{
            //step1: fetch the user using email
            const user=await this.userRepository.getByEmail(email);
            //step2: now compare the password
            const checkPwd=this.checkPassword(password,user.password);
            if(!checkPwd){
                //ie. pwd not valid
                console.log("password doesn't match")
                throw {error:"Incorrect Password"};
            }
            //if pwd valid then step3: create token & return 
            const token=this.createToken({email:user.email,id:user.id});
            return token;
        }catch(err){
            console.log("error happened at user service layer while signIn, ",err);
            throw err;
        }
    }
    createToken(user){
        try{
            console.log("jwt key is ",JWT_KEY);
            const token=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return token;
        }catch(err){
            console.log("error happened at creating token, ",err);
            throw err;
        }
    }
    verifyToken(token){
        try{
            const response=jwt.verify(token,JWT_KEY);
            return response;
        }catch(err){
            console.log("error happened at verifying token, ",err);
            throw err;
        }
    }

    checkPassword(plainPwd,encryptedPwd){
        try{
           const res= bcrypt.compareSync(plainPwd,encryptedPwd);
           return res;
        }catch(err){
            console.log("error happened at comparing password, ",err);
            throw err;
        }
    }
}

module.exports=UserService