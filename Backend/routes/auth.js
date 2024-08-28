const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');


const JWT_SECRET = 'secret#key';


//Route 1:  Create a user using :POST "/api/auth/createuser". signup
router.post('/createuser', [
    body('name', "Enter a valid email").notEmpty(),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()

], async (req, res) => {
    //checking validation if email is not
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    //create a new user

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "already a user" })
        }
        //password hashing
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        //jwt web authentication token 
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    catch (error) {
        res.status(500).send("some Error Occured");
    }
})

//Route 2 :Login a user using :POST "/api/auth/login". signin

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()

], async (req, res) => {
    //checking validation if email is not
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'Login with current credentials' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: 'Login with current credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.log(error);
        res.status(500).send("some Error Occured");
    }

})

//Route 3: Get logged in user details using "/api/auth/getuser" .Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("some Error Occured");
    }

})


module.exports = router;