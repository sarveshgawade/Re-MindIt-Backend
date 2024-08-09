import savedPasswords from "../models/passwordModel.js";

async function saveNewPassword(req,res,next) {
    try {
        const {websiteName,registeredEmail,userName,password} = req.body

        if(!websiteName || !registeredEmail || !password){
            res.status(500).json('All fields are required')
        }

        const loggedinUserEmail = req.user.email

        const newPassword = await savedPasswords.create({
            websiteName,
            registeredEmail,
            userName,
            password,
            email: loggedinUserEmail
        })

        if(!newPassword){
            res.status(500).json('Error in saving new password')
        }

        await newPassword.save()

        res.status(200).json({
            success: true ,
            message: 'New Password details saved !',
            newPassword
        })

    } catch (error) {
        console.log(error);
        
    }
}

async function getAllPasswords(req,res,next) {
    try {

        
        const loggedinUserEmail = req.user.email
        // console.log(loggedinUserEmail);

        const allPasswordDetails = await savedPasswords.find({email: loggedinUserEmail})

        
        res.status(200).json({
            success: true,
            message: 'All Password Details found' ,
            allPasswordDetails
        })


    } catch (error) {
        console.log(error);
        
    }
}

async function  deletePassword(req,res) {
    try {
        const {passwordId} = req.params

        if(!passwordId){
            req.status(500).json('PasswordID is required !')
        }

        const response = await savedPasswords.findByIdAndDelete(passwordId)

        console.log(response);
        
        if(!response){
            res.status(500).json('Error in deleting password !')
        }
        
        res.status(200).json({
            success: true ,
            message: 'Password Deleted !'
        })
    } catch (error) {
        console.log(error);
        
    }
}

async function editPassword(req,res) {
    try {
        const {passwordId} = req.params

        const updatedPasswordDetails = await savedPasswords.findByIdAndUpdate(passwordId, {$set:req.body})

        if(!updatedPasswordDetails){
            res.status(500).json('Error in updating !')
        }

        await updatedPasswordDetails.save()

        const updatedPassword = await savedPasswords.findById(passwordId)

        res.status(200).json({
            success: true ,
            message: 'Details updated !',
            updatedPassword
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export {saveNewPassword,getAllPasswords,deletePassword,editPassword}