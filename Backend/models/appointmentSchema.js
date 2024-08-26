import mongoose from "mongoose";
import validator from "validator";
import moment from  "moment";

const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [3, "First Name must"],
  },
  lastname: {
    type: String,
    required: true,
    minLength: [3, "last Name must"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number must contains 10 Digit"],
    maxLength: [10, "Phone Number must contains 10 Digit"],
  },
  //in india nic value
  nic: {
    type: String,
    required: true,
    minLength: [5, "NIC must contains 5 Digi"],
    maxLength: [6, "NIC must contains 6 Digit"],
  },
  //need to modify in future
  dob: {
    type: Date,
    required: [true, "DOB is required !"],
    //below line fix dob syntax error used moment
    set: (val) => moment(val, "DD/MM/YYYY").toDate(),
  },
  gender:{
    type: String,
    required:true,
    enum:["Male","Female"]
},

  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
        type:String,
        required: true,
    },
  },
  hasVisted: {
    type:Boolean,
    default:false,
  },
doctorId:{
    type:mongoose.Schema.ObjectId,
    required: true
},
patientsId:{
    type:mongoose.Schema.ObjectId,
    required: true
},
address:{
    type:String,
    required: true
},
status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default: "Pending",
},
});

export const Appointment = mongoose.model("Appointment",appointmentSchema);
