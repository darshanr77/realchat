import { generateToken } from "../lib/Utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check for required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password length must be at least 6 characters" });
    }

    // Check if email is valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({email:email});

    if(user){
        return res.status(400).json({message:"User already exists"});
    }
  
    // 123456 => $dnjasdkasj_?dmsakmk
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating user details for newuser
    const newUser = newUser({
        fullName,email,password:hashedPassword
    });

    if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error"});
  }
};

export const login = async () => {
    try{

    }catch(error){

    }
};


export const logout = async () => {
    try{

    }catch(error){

    }
};










