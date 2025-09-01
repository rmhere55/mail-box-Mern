import { Router } from "express";
import { createUser, loginUser } from "../controllers/userControllers";



const router = Router();
router.post("/sign-up", createUser)
router.post("/login", loginUser)

export default router;