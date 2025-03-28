const express = require('express');
const experienceSchema = require('../Models/ExperianceModel');
const { sendResponse,sendErrorResponse } = require('../MiddleWares/Response');
const checkAuth = require('../MiddleWares/CheckAuth');
const { default: mongoose } = require('mongoose');
const experienceRouter = express.Router();


experienceRouter.post('/add', checkAuth, async (req, res, next) => {
    try {
        const userId = { "userId": req.userId };
        const bodyData = req.body;
        const experienceData = { ...userId, ...bodyData };
        const result = await experienceSchema.create(experienceData);
        if (result) {
            sendResponse(res, true, "Experiance added successfully", result);
        }
        else {
            sendResponse(res, false, "Failed to add experiance", result);
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});


experienceRouter.post('/getById',checkAuth,async (req,res,next)=>{
    try {
        const queryKey = {"userId": new mongoose.Types.ObjectId(req.userId) };
        const result = await experienceSchema.find(queryKey);
        if(result){
            sendResponse(res, true, "Experiance found successfully", result);
        }
        else{
            sendResponse(res, false, "Failed to found experiance", result);
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});

experienceRouter.get('/getAll',async (req,res,next)=>{
    const result = await experienceSchema.find();
    console.log(result);

})

module.exports = experienceRouter;
