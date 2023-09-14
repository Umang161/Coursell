import { SERVER_PORT } from './util/constants.js';
import express from "express";
import mongoose from "mongoose";
import { MONGODB_URL } from "./util/constants";

const app = express();

//express.json() middleware. Text => JavaScript Object => req.body.
app.use(express.json());

mongoose.connect(MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true});

//Define Mongoose Schemas.
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
})

const adminSchema= new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number,
    published:Boolean
})

//Defining Mongoose Models.
const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',userSchema);
const Course = mongoose.model('Course',userSchema);

app.post('/admin/signup',(req,res)=>{

})

app.post('/admin/login',(req,res)=>{

})

app.post('/user/signup',(req,res)=>{

})

app.post('/user/login',(req,res)=>{

})

app.listen(SERVER_PORT,()=>{
    console.log("Listening On Port No. "+SERVER_PORT);
});