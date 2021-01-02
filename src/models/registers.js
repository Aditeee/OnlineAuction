const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:true
      },
      lastname :{
        type:String,
        required:true
      },
      company :{
        type:String,
        required:true
      },
      email :{
        type:String,
        required:true,
        unique:true
      },
      areacode :{
        type:Number,
        required:true,
      },
      phone :{
        type:Number,
        required:true,
        unique:true
      },
      Occupation :{
        type:String,
        required:true
      },
      password :{
        type:String,
        required:true
      },
      confirmpassword :{
        type:String,
        required:true
      }

})

const Register = new mongoose.model("Register" , userSchema);

module.exports = Register; 