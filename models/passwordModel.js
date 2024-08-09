import mongoose, { model } from "mongoose";

const savedPasswordSchema = new mongoose.Schema({
    websiteName: {
        type: String,
        required: [true, 'Website-name is a required field'],
        trim: true
    },
    userName: {
        type: String,
        required: [true, 'user-name is a required field'],
        trim: true
    },
    registeredEmail: {
        type: String,
        required: [true, 'Registered-Email is a required field'],
        trim: true,
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     'Please enter a valid email address'
        // ]
    },
    password: {
        type: String ,
        required: true ,
        trim : true ,
    },
    email: {
        type: 'String',
        required: [true, 'Registered-Email is a required field'],
        trim: true,
    }
    
},{
    timestamps: true
})

const savedPasswords = model('saved-passwords',savedPasswordSchema)

export default savedPasswords