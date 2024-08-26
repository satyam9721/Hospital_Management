import mongoose from "mongoose";
import validator from "validator"; //to validate the data
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from  "moment";


//this schema created for user

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
            minLength: [3,"First Name must"]
        },
        lastname:{
            type: String,
            required: true,
            minLength: [3,"last Name must"]
        },
        email:{
            type: String,
            required: true,
            validate: [validator.isEmail,"Please provide valid email"]
        },
        phone:{
            type:String,
            required: true,
            minLength: [10,"Phone Number must contains 10 Digit"],
            maxLength: [10,"Phone Number must contains 10 Digit"]
        },
        //in india nic value
        nic:{
            type:String,
            required: true,
            minLength: [5,"NIC must contains 5 Digi"],
            maxLength:[6,"NIC must contains 6 Digit"]
            
        },
        //need to modify in future
        dob:{
            type: Date,
            required: [true,"DOB is required !"],
            //below line fix dob syntax error used moment
            set: val => moment(val, "DD/MM/YYYY").toDate()

        },
        


        gender:{
            type: String,
            required:true,
            enum:["Male","Female"]
        },
        password:{
            type:String,
            required: true,
            minLength:[8,"password must contain at least 8 Charcter"],
            select :false
        },
        role:{
            type:String,
            required:true,
            enum:["Admin","Patient","Doctor"]

        },
        doctorDepartment:{
            type:String
        },
        docAvatar:{
            public_id:String,
            url: String,
        }


    }
)

//to save the password and peerform hashing
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password= await bcrypt.hash(this.password, 10);
});




//to compare the passwords
userSchema.methods.comparePassword =async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
}

//to genrate the token when user login
userSchema.methods.genrateJsonWebToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
        
    });
}













//definig model schema
export const User = mongoose.model("users",userSchema);