import {Router} from 'express'
import { signin, signup ,getProfile, logout, changePassword} from '../controllers/userController.js'
import { authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/my-profile',isLoggedIn,getProfile)
router.get('/logout',isLoggedIn,logout)
router.post('/change-password',isLoggedIn,changePassword)


export default router