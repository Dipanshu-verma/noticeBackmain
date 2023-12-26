 import bcrypt from "bcrypt"
 import jwt from "jsonwebtoken";
 import dotenv from "dotenv"
 dotenv.config();
import UserModel from "../models/User.model.js";


export const registerController = async(req,res)=>{

    try {
        const { name, email, password, phone_number, department } = req.body;
    
     
        const existUser = await UserModel.findOne({ email });

        if (existUser) {
          return res.status(400).json({ message: 'User already exist please use another email' });
        }
    
      
        const hashPassword = await bcrypt.hash(password, 5);
    
      
        const user = await UserModel.create({
          name,
          email,
          password: hashPassword,
          phone_number,
          department,
        });
    
       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
    
        res.status(200).json({ user, token });

      } catch (error) {

        
        res.status(500).json({ message: 'server error' });
      }

}

export const loginController = async(req,res)=>{

    try {
        const { email, password } = req.body;
    
       
        const userexist = await UserModel.findOne({ email });
        
        if (!userexist) {

          return res.status(404).json({ message: 'user not found' });

        }
    
        
        const passwordCheck = await bcrypt.compare(password, userexist.password);

        if (!passwordCheck) {
          return res.status(401).json({ message: 'Invalid password' });
        }
     
        const token = jwt.sign({ userId: userexist._id }, process.env.JWT_KEY);
    
        res.status(200).json({ user:userexist, token });

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}