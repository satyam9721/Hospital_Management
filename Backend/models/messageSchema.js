import mongoose from "mongoose";
import validator from "validator"; //to validate the data


const messageSchema = new mongoose.Schema(
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
        message:{
            type:String,
            required: true,
            minLength: [10,"message should contain 10 characters"],
            
        }

    }
)

//definig model schema
export const Message = mongoose.model("Message",messageSchema);