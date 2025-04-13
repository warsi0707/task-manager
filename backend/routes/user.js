const Router = require('express');
const { User } = require('../model/Databse');
const userRouter = Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { USER_JWT_SECRET, NODE_ENV } = require('../Config/Config');
const { Auth } = require('../middleware/Auth');

//user signup
userRouter.post("/signup", async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.json({
                message: "User already exist"
            })
        }
        if (password !== confirmPassword) {
            return res.status(404).json({
                message: "password and confirm password not matched"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            password: hashPassword
        })
        return res.status(200).json({
            message: "Signup Success"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//user signin
userRouter.post("/signin", async(req, res)=>{
    const {username, password} = req.body;

    try{
        const findUser = await User.findOne({username})
        console.log(findUser)
        if(!findUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const comparePassword =findUser? await bcrypt.compare(password,findUser.password): false;
        if(!comparePassword){
            return res.status(404).json({
                message: `Username or Password incorrect `
            })
        }
        const token = jwt.sign({
            userId : findUser._id
        },USER_JWT_SECRET)
        res.cookie('token', token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: NODE_ENV === "Development" ? "lax" : "none",
            secure: NODE_ENV === "Development" ? false : true
        })
        res.json({
            message: "Signin success",
            token :token
        })
       
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
//auth verification
userRouter.get('/verify',Auth, async(req, res)=>{
    const userId = req.user;
    try{
        if(!userId){
            return res.status(404).json({
                authenticated: false
            })
        }
        const findUser = await User.findById(userId)
        if(!findUser){
            return res.status(404).json({
                authenticated: false
            })
        }
        return res.json({
            authenticated: true
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
//user logout
userRouter.post("/logout",Auth,async(req, res)=>{
    const userId = req.user;

    try{
        const findUser = await User.findById(userId)
        if(!findUser){
            return res.status(404).json({
                message: "Logout failed"
            })
        }
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: NODE_ENV === 'Development'? 'lax': 'none',
            secure: NODE_ENV === 'Development'? false: true
        },USER_JWT_SECRET)
        res.json({
            message: "Logout Success",
            authenticated: false
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})

module.exports = { userRouter }