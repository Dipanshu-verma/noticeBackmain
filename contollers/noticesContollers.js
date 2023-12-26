import NoticeModel from "../models/notices.mmodel.js";
import jwt from "jsonwebtoken"

export const getNoticesController  = async(req,res)=>{
    try {
        const { category } = req.query;
        let query = {};
    
       
        if (category) {
          query = { category };
        }
    
        const notices = await NoticeModel.find(query);
       
        res.status(200).json(notices);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

}
 
export const createNoticeController = async(req,res)=>{
    try {
        const { title, body, category } = req.body;
        const userId = req.userId;  
    
       

        const notice = await NoticeModel.create({ title, body, category, user: userId });
    
        res.status(201).json(notice);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export const getNoticeByIdContrroler = async (req, res) => {
  try {
    const { id } = req.params;
     
    const notice = await NoticeModel.find({user:id})
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found please find' });
    }
    res.status(200).json(notice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateNoticeController = async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, body, category } = req.body;
   
        const notice = await NoticeModel.findByIdAndUpdate(
          id,
          { title, body, category },
          { new: true }
        );
    
        if (!notice) {
          return res.status(404).json({ message: 'Notice not found please try again' });
        }
    
        res.status(200).json(notice);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}


export const deleteNoticeController = async(req,res)=>{
    try {
        const { id } = req.params;
    
        const notice = await NoticeModel.findByIdAndDelete(id);
    
        if (!notice) {
          return res.status(404).json({ message: 'Notice not found' });
        }
    
        res.status(200).json({message:"deleted"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
