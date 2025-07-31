import express from 'express';
import experienceSchema from '../Models/ExperianceModel.js';
import { sendResponse, sendErrorResponse } from '../MiddleWares/Response.js';
import { checkAuth } from '../MiddleWares/CheckAuth.js';
import mongoose from 'mongoose';
const experienceRouter = express.Router();


experienceRouter.post('/add', checkAuth, async (req, res, next) => {
    try {

        const bodyData = req.body;
        const userId = { "userId": req.userId }
        const experienceData = { ...userId, ...bodyData };

        const recordId = req.body._id;

        if(recordId===null||recordId===""){
            const result = await experienceSchema.create(experienceData);
            if(result){
                sendResponse(res, true, "Experiance added successfully", result);
            }
            else{
                sendResponse(res, false, "Failed to add experiance", result);
            }
        }
        else{
            const result = await experienceSchema.updateOne({ _id: recordId }, { $set: experienceData });
              if(result){
                sendResponse(res, true, "Experiance updated successfully", result);
            }
            else{
                sendResponse(res, false, "Failed to update experiance", result);
            }
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});


experienceRouter.post('/getById', checkAuth, async (req, res, next) => {
    try {
        const queryKey = { "userId": new mongoose.Types.ObjectId(req.userId) };
        const result = await experienceSchema.find(queryKey);
        if (result) {
            sendResponse(res, true, "Experiance found successfully", result);
        }
        else {
            sendResponse(res, false, "Failed to found experiance", result);
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});

experienceRouter.get('/getAll', async (req, res, next) => {
    const result = await experienceSchema.find();
    console.log(result);

});

experienceRouter.delete('/delete',checkAuth,async (req,res,next)=>{
    try {
        var recordId  = req.body._id;
        var result = await experienceSchema.deleteOne({_id:recordId});
        if(result){
            sendResponse(res, true, "Experiance removed successfully", result);
        }
        else{
            sendResponse(res, false, "Failed to remove experiance", result);
        }
    } catch (error) {
        
    }

});

export default experienceRouter;
