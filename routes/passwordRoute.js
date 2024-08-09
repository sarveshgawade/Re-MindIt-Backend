import { Router } from "express";
import { deletePassword, editPassword, getAllPasswords, saveNewPassword } from "../controllers/savedPasswordController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router()

router.post('/add',isLoggedIn,saveNewPassword)
router.get('/',isLoggedIn,getAllPasswords)
router.delete('/:passwordId',isLoggedIn,deletePassword)
router.put('/edit/:passwordId',isLoggedIn,editPassword)

export default router