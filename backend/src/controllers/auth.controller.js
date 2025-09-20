import { generateToken } from "../lib/Utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 🔹 Check for required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔹 Check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // 🔹 Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 🔹 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔹 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 🔹 Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🔹 Send response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic || null,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async () => {
    try{
      const {email,password} = req.body;

      if(!email || !password){
        return res.status(400).json({message:"All feilds are required"});
      }

      const user = await User.findOne({email:email});

      if(!user){
        return res.status(400).json({message:"You have not signed up"});
      }

      const samePassword = await bcrypt.compare(password,user.password);

      if(!samePassword){
        return res.status(400).json({message:"Invalid password"});
      }

    }catch(error){
      console.log("Error in loging in",error);
      res.status(500).json({message:"Internal server"});
    }
};


export const logout = async () => {
    try{

    }catch(error){

    }
};










