import express from "express";
import mongoose from "mongoose";
import {SERVER_PORT, MONGODB_URL} from './util/constants.js';
const app = express();

//express.json() middleware. Text => JavaScript Object => req.body.
app.use(express.json());

mongoose.connect(MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true});

//Define Mongoose Schemas.
//Add Strictness in schema.
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
const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Course',courseSchema);

app.post('/admin/signup', async (req,res)=>{
    const {username, password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin){
        res.status(401).json({message:"Admin Already Exists. Please Login Instead"});
    }else{
        const obj = ({
            username:username,
            password:password
        })
        const newAdmin = new Admin(obj);
        await newAdmin.save();
        res.json({message:"Admin Created Successfully."})
    }
 })

app.post('/user/signup',async(req,res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(user){
        res.status(401).json({message:"User Already Exists. Please Login Instead"});
    }else{
        const obj = ({
            username:username,
            password:password,
            purchasedCourses:[]
        })
        const newUser = new User(obj);
        await newUser.save();
        res.json({message:"User Created Successfully."})
    }
})

app.listen(SERVER_PORT,()=>{
    console.log("Listening On Port No. "+SERVER_PORT);
});