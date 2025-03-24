const express = require('express');
const qualificationSchema = require('../Models/QualifaicationModel');
const { sendResponse, sendErrorResponse } = require('../MiddleWares/Response');
const checkAuth = require('../MiddleWares/CheckAuth');
const { default: mongoose } = require('mongoose');
const qualificationRouter = express.Router();


qualificationRouter.post('/add',checkAuth,async(req,res,next)=>{
    try {
        const userId = {"userId":req.userId};
        const bodyData = req.body;
        const qualificationData = { ...userId, ...bodyData};
        const result = await qualificationSchema.create(qualificationData);
        if(result){
            sendResponse(res,true,"Qualification added successfully",result);
        }
        else{
            sendResponse(res,false,"Failed to add qualification",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message);
    }
});


qualificationRouter.post('/getById',checkAuth,async (req,res,next)=>{
    try {
        const queryKey = { "userId": new mongoose.Types.ObjectId(req.userId) };
        const result = await qualificationSchema.find(queryKey);
        if(result){
            sendResponse(res,true,"Qualification Found",result);
        }
        else{
            sendResponse(res,false,"Qualification Found",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message);
    }
});


module.exports = qualificationRouter;