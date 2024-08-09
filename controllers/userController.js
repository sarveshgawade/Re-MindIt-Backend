import User from "../models/userModel.js";

const cookieOptions = {
    maxAge: 1*24*60*60*1000, // 1 day
    httpOnly: true,
    secure: false
}

async function signup(req,res,next){
    try {
        
        const {userName,email,password} = req.body
        
        if(!userName || !email || !password){
            res.status(500).json('All fields are required !')
        }

        const existingUser = await User.findOne({email})

        if(existingUser) {res.status(500).json('User already exits')}

        const newUser = await User.create({userName,email,password})

        if(!newUser)   { res.status(500).json('Error in creating new user !') }    

        await newUser.save()

        const token = await newUser.generateJwtToken()

        res.cookie('token',token,cookieOptions)

        newUser.password = undefined

        res.status(200).json({
            success: true ,
            message: `User registered successfully`, 
            newUser
        })

    } catch (error) {
        console.log(error);
    }
} 

async function signin(req,res,next){
    try {
        const {email,password} = req.body

        if(!email || !password) {res.status(500).json('All fields are required !')}

        const existingUser = await User.findOne({email}).select('+password')

        if(!existingUser || !(await existingUser.comparePassword(password))){
            res.status(500).json('Email & password does not match !')
        }

        const token = await existingUser.generateJwtToken()

        res.cookie('token',token,cookieOptions)

        existingUser.password = undefined

        res.status(200).json({
            success: true ,
            message: 'Logged in successfully !',
            existingUser
        })


    } catch (error) {
        console.log(error);
    }
}

async function getProfile(req,res,next){
    try {
        const userID = req.user.id

        const userProfile = await User.findById(userID)

        if(!userProfile) {res.status(500).json('User not found !')}

        res.status(200).json({
            success: true ,
            message: 'User deatils found !',
            userProfile
        })

    } catch (error) {
        console.log(error);
    }
}

async function logout(req,res){
    try {
        res.cookie('token',null,{
            secure: true ,
            maxAge: 0 ,
            httpOnly: true
        })

        res.status(200).json({
            success: true ,
            message: 'User logged out'
        })
    } catch (error) {
        console.log(error);
    }
}

async function changePassword(req,res,next){
    try {
        const {oldPassword, newPassword} = req.body
        const userID = req.user.id

        if(!oldPassword || !newPassword){res.status(500).json('All fields are required')}

        if(oldPassword == newPassword) {res.status(500).json('Old and New password are same')}

        const user = await User.findById(userID).select('+password')

        if(!user) {res.status(500).json('User not found')}

        const isPasswordCorrect = await user.comparePassword(oldPassword)

        if(!isPasswordCorrect){res.status(500).json('Old  password is invalid')}

        user.password = newPassword

        await user.save()

        user.password = undefined

        res.status(200).json({
            success: true ,
            message: 'Password changed',
        })
    } catch (error) {
        console.log(error);
    }
}

export {signup,signin,getProfile,logout,changePassword}