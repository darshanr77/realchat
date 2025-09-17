import express from "express";


const Router = express.Router();

Router.get("/api/auth/signup",(req,res)=>{
    res.send("signup endpoint page")
});

Router.get("/api/auth/login",(req,res)=>{
    res.send("signup endpoint page")
});

Router.get("/api/auth/logout",(req,res)=>{
    res.send("logout endpoint page")
});


export default Router;