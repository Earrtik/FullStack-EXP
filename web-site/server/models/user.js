const { DataTypes } = require("sequelize");
const sequelize = require("../bd");

const bcrypt = require('bcrypt');

const User = sequelize.define("user", { // definim uer
  email: { type: DataTypes.STRING, unique: true, allowNull: false ,
    validate:{
      isEmail:true,  // verificare  e email
      len: [4,30] , //intre 4 si 30 caractere
    } },

  password: { type: DataTypes.STRING, allowNull: false ,//  allowNull: false, obligatoriu de indeplinit
    validate:{
      len:[8,30]
    } }, 
  role: { type: DataTypes.STRING, defaultValue: "USER" },
},
{
  tableName: "users",  //Numele la baza de date
  timestamps: true, 
  hooks:{
    beforeCreate: async(user)=>{
      if  (user.password)
      {
        user.password = await bcrypt.hash(user.password,10);//hash la parola la creare
      }
    },
    beforeUpdate: async(user)=> {
      if(user.changed("password")){
        user.password = await bcrypt.hash(user.password,10);//hash la parola dupa update
      }
    }
  }
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
