const express = require('express');
const healthCareWorkerSchema = require('../Models/HealthCareWorkerModel');
const { sendResponse, sendErrorResponse, sendLoginResponse } = require('../MiddleWares/Response');
const { encrypt } = require('../MiddleWares/EncryptDecrypt');
const healthcareworkerRouter = express.Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../MiddleWares/CheckAuth');
const { default: mongoose } = require('mongoose');
require('dotenv').config();


healthcareworkerRouter.post('/signUp', async (req, res, next) => {
    try {
        const healthcareworkerData = req.body;
        const result = await healthCareWorkerSchema.create(healthcareworkerData);
        if (result) {
            sendResponse(res, true, `Hey ${req.body.fullName} your account created successfully.Thank you.`, result);
        }
        else {
            sendResponse(res, false, "Failed to create your account", result);
        }
    } catch (error) {
        if (error.code === 11000) {
            sendResponse(res, false, `${Object.keys(error.keyValue)[0]} is alreay existed`);
        }
        else {
            sendErrorResponse(res, false, error.message);
        }
    }

});


healthcareworkerRouter.post('/login', async (req, res, next) => {
    try {
        const emailQuery = { "email": req.body.email };
        const result = await healthCareWorkerSchema.findOne(emailQuery);
        if (result) {
            const comparePassword = encrypt(req.body.password);
            const { password, ...userData } = result.toObject();
            if (result.password === comparePassword) {
                const jwttoken = jwt.sign({
                    _id: userData._id,
                    roleId: userData.roleId,
                },
                    'this is login data',
                    {
                        expiresIn: "24h"
                    },
                );
                sendLoginResponse(res, true, "Login successfully", result, jwttoken);
            }
            else {
                sendResponse(res, false, "Password does not match");
            }
        }
        else {
            sendResponse(res, false, "No account found with this email")
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});


healthcareworkerRouter.post('/getById', checkAuth, async (req, res, next) => {
    try {
        const query = { _id: new mongoose.Types.ObjectId(req.userId) };
        const result = await healthCareWorkerSchema.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "qualifications",
                    localField: "_id",
                    foreignField: "userId",
                    as: "qualificationDetails",
                },
            },
            {
                $lookup: {
                    from: "experiences",
                    localField: "_id",
                    foreignField: "userId",
                    as: "expreianceDetails",
                },
            },
            {
                $lookup: {
                    from: "bankdetails",
                    localField: "_id",
                    foreignField: "userId",
                    as: "bankData",
                },
            },
            // {
            //     $project: {
            //         "qualificationDetails.userId": 0,
            //         "expreianceDetails.userId": 0,
            //         "bankData.userId": 0
            //     }
            // }
        ]).exec().lean();        ;
        if (result) {
            sendResponse(res, true, "User Data found", result);
        }
        else {
            sendResponse(res, false, "Failed to found", result);
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});


healthcareworkerRouter.put('/updateStatus', checkAuth, async (req, res, next) => {
    try {
        const result = await healthCareWorkerSchema.updateOne({_id:req.userId},{$set:{verificationStatus:req.body.verificationStatus}});
        if (result) {
            sendResponse(res, true, "Status updated successfully", result);
        }
        else {
            sendResponse(res, false, "Failed to update status", {})
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message, {});

    }
});


healthcareworkerRouter.put('/updateDetails',checkAuth,async(req,res,next)=>{
    try {
        const result = healthCareWorkerSchema.updateOne({_id:req.userId},{$set:req.body});
        if(result){
            sendResponse(res,true,"Profile Details Update",result);
        }
        else{
            sendResponse(res,false,"Failed to update details",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message,{})
        
    }
});

healthcareworkerRouter.get('/getAll',async (req,res,next)=>{
    const result = await healthCareWorkerSchema.find();
    sendResponse(res,true,"",result);
});
module.exports = healthcareworkerRouter;