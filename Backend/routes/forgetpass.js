const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

router.post('/send-otp',[
    body('email', "Enter a valid email").isEmail()
],async (req,res)=>{
    const result = validationResult(req);
    if(!result){
        return res.send({ errors: result.array() });
    }
    const generatedOtp=Math.floor(100000 + Math.random() * 900000);

    try {
        const {email}=req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'Login with current credentials' });
        }
        

        const transporter = nodemailer.createTransport({
            service:'gmail',
            secure: true,
            port:465,
            auth:{
                user:'velociraptorindustries.home@gmail.com',
                pass:'jklf zwbm axlc lerz'
            }
        });

        const reciever={
            from: "velociraptorindustries.home@gmail.com",
            to : `${email}`,
            subject : "OTP for resetting the password",
            text:`OTP to reset your password of notering is ${generatedOtp}` 
        }
        
        transporter.sendMail(reciever,(error,info)=>{
            if (error) {
                console.error(error);
                res.status(500).send('Error sending OTP');
              } else {
                res.json({generatedOtp});
              }
        });



        
    } catch (error) {
        console.log(error)
        res.status(500).send("some Error Occured");
        
    }
})


router.put("/resetpass",[
    body('password', 'Password cannot be blank').exists()
],async(req,res)=>{
    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        

        const {email,password}=req.body;
        const salt= await bcrypt.genSalt(10);
        const securePass= await bcrypt.hash(password,salt);

        let user = User.findOne({email:email});
        let newUser= {
            name: user.name,
            password: securePass,
            email: req.body.email
        }
        user = await User.findOneAndUpdate({email:email},{$set:newUser},{new:true});
        res.status(200).json("password updated successfully");
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }

})


module.exports=router;