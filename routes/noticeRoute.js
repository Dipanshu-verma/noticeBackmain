import { Router } from "express";
import { createNoticeController,updateNoticeController,  getNoticesController, deleteNoticeController, } from "../contollers/noticesContollers.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

 

const noticeRouter  = Router();

noticeRouter.use(verifyToken)

noticeRouter.get('/',getNoticesController);
noticeRouter.post('/',createNoticeController);
noticeRouter.put('/:id',verifyToken, updateNoticeController);
noticeRouter.delete('/:id',verifyToken, deleteNoticeController);


export default noticeRouter;