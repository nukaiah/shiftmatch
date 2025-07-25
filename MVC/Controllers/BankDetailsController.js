import express from 'express';
import bankDetailsSchema from '../Models/BankDetailsModels.js';
import { sendResponse,sendErrorResponse } from '../MiddleWares/Response.js';
import { checkAuth } from '../MiddleWares/CheckAuth.js';
import mongoose from 'mongoose';
const bankDetailsRouter = express.Router();


bankDetailsRouter.post('/add',checkAuth,async (req,res,next)=>{
    try {
        const bodyData = req.body;
        const userId = {"userId":req.userId}
        const bankDetailsData = {...userId,...bodyData};
        const result = await bankDetailsSchema.create(bankDetailsData);
        if(result){
            sendResponse(res,true,"Bank Details Updated successfully",result);
        }
        else{
            sendResponse(res,false,"Failed to add Bank Details",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message);
    }
});


bankDetailsRouter.post('/getById',checkAuth,async (req,res,next)=>{
    try {
        const query = { "userId": new mongoose.Types.ObjectId(req.userId) };
        const result = await bankDetailsSchema.findOne(query);
        if(result){
            sendResponse(res,true,"Details found",result);
        }
        else{
            sendResponse(res,false,"No Data found",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message);
    }
});

export default bankDetailsRouter;