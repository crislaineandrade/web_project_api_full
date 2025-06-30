import { Router } from "express";
const router = Router()

import { registerUser, authorizeUser, checkMe } from "../controllers/auth.js";

router.post('/signup', registerUser)

router.post('/signin', authorizeUser)




export { router }