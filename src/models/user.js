'use strict';

const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[4,100]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user)=>{
    // console.log("inside trigger user is: ",user)
    
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password=hash
  })
  return User;
};