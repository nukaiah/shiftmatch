const express = require('express');
const shiftPostSchema = require('../Models/ShiftPostModel');
const { sendResponse, sendErrorResponse } = require('../MiddleWares/Response');
const checkAuth = require('../MiddleWares/CheckAuth');
const shiftpostRouter = express.Router();

shiftpostRouter.post('/postShift',checkAuth,async (req,res,next)=>{
    try {
        const roleId = req.roleId;
        console.log(roleId);
        // if(roleId===2){
            const bodyData = req.body;
            const userId = {"postedBy":req.userId};
            const shiftpostData = {...userId, ...bodyData};
            const result = await shiftPostSchema.create(shiftpostData);
            if(result){
                sendResponse(res,true,"Shift posted Successfully",result);
            }
            else{
                sendResponse(res,false,"Failed to post a Shift",result);
            }
        // }
        // else{
        //     sendResponse(res,false,"You are not an admin.You can not post the shift");
        // }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});


shiftpostRouter.post('/getShits',checkAuth,async (req,res,next)=>{
    try {
        const queryKey = {"postedBy":req.userId};
        const result = await shiftPostSchema.find(queryKey);
        if(result){
            sendResponse(res,true,"Shifts found successfully",result);
        }
        else{
            sendResponse(res,false,"Failed to find shifts",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message);
    }

});


module.exports = shiftpostRouter;