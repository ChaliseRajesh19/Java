import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Hash passwords securely
import "dotenv/config"

const prisma = new PrismaClient();
const SECRET_KEY=process.env.JWT_SECRET||"i am back";

// Login Function - Verifies User Credentials
const createLogin = async ({ email, password }) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return { error: "User not found" };
        }

        // Compare hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return { error: "Invalid credentials" };
        }

        const token = jwt.sign({ 
            data:user,
            expiresIn:"1d"
        },process.env.JWT_SECRET)
        return {user,token}
    } catch (error) {
        console.error("Login Error: ", error);
        return { error: "Something went wrong" };
    }
    
};

// Register Function - Adds New User if Not Already Registered
const register = async ({ name, email, password, gender }) => {
    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { error: "User already registered" };
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                gender
            }
        });

        const token = jwt.sign({ userId:user.id,email:user.email},SECRET_KEY,{expiresIn:"1h"})
        return {user,token}
    } catch (error) {
        console.error("Registration Error: ", error);
        return { error: "Something went wrong" };
    }
    
};
export { createLogin, register };
