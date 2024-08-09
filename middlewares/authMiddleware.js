import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

async function isLoggedIn(req,res,next){
    try {
        const {token} = req.cookies

        if(!token){
            res.status(500).json('Unauthenticated user !')
        }

        const userDetails = jwt.verify(token,process.env.SECRET)

        req.user = userDetails

        next()

    } catch (error) {
        console.log(error);
    }
}


function authorizedRoles(...roles) {
    return async function (req, res, next) {
        const currentRole = req.user.role;

        if (!roles.includes(currentRole)) {
            return next(new AppError(500, 'You do not have permission to access this route'));
        }

        next();
    };
}


export {authorizedRoles,isLoggedIn}