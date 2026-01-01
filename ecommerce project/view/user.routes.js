import express from 'express';
const router = express.Router();
import { users, signup, logout, reset, login, singleUser } from '../controllers/users.controller.js';
import { verifyToken } from '../security/jwt.auth.js';

//signup
router.post("/signup", signup)

//login
router.post("/login", login)

//reset password
router.put("/reset", reset)

//logout
router.get("/logout", logout)

//get all users
router.get("/users", verifyToken, users)

//get a specific user through username or id 
router.get("/users/:id", singleUser)


export default router;