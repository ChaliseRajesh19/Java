import express from 'express';
import { createLogin, register } from '../services/login.services.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const result = await createLogin(req.body)
       
        res.json(result);
    } catch (error) {
        console.log("Error at login: ", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const result = await register(req.body);
        if (result.error) {
            return res.status(400).json({
                message: "Registration failed",
                error: result.error
            });
        }
        res.status(201).json(result);
    } catch (error) {
        console.log("Error at register: ", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
});

router.get("/users/:userId",async(req,res)=>{
    try {
        const result = await getuser(req.body);
        if (result.error) {
            return res.status(400).json({
                message: "Not found",
                error: result.error
            });
        }
        res.status(201).json(result);
    } catch (error) {
        console.log("Error at getuser: ", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }

})

export default router;
