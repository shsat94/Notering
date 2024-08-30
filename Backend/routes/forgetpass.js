const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');



router.post('/',[
    body('email', "Enter a valid email").isEmail()
],async (req,res)=>{
    const result = validationResult(req);
    if(!result){
        return res.send({ errors: result.array() });
    }
    const generatedOtp=Math.floor(100000 + Math.random() * 900000);

    try {
        const {email}=req.body;
        const otp =generateOTP();

        const transporter = nodemailer.createTransport({
            service:'gmail',
            secure: true,
            port:465,
            auth:{
                user:'velociraptorindustries@gmail.com',
                pass:'sddfdgd'
            }
        });

        const reciever={
            from: "velociraptorindustries@gmail.com",
            to : 'shsat94@gmail.com',
            subject : "OTP for resetting the password",
            text:`OTP to reset your password in of notering is ${generatedOtp}` 
        }



        
    } catch (error) {
        res.status(500).send("some Error Occured");
        
    }
})



module.exports=router;