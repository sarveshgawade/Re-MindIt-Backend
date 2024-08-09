import mongoose, { model } from 'mongoose'
import brcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is a required field'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Username is a required field'],
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
          ] 
    },
    password: {
        type: String ,
        required: true ,
        trim : true ,
        select : false   ,
        minLength : [6,`Password must be atleast of 6 characters`]
    },
    role: {
        type:'String',
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{
    timestamps: true
})

// user methods
userSchema.methods = {
    comparePassword: async function(plainTextPassword){
        return await brcypt.compare(plainTextPassword, this.password)
    },
    generateJwtToken : async function(){
        return await jwt.sign({
                id: this._id,
                email: this.email,
                role: this.role,
                userName: this.userName
            },
            process.env.SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
}

// password encryption before data saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await brcypt.hash(this.password,7)
})

const User = model('User',userSchema)

export default User