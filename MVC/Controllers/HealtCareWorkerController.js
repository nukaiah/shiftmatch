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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
                sendLoginResponse(res, false, "Login successfully", result, jwttoken);
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
        ]);
        if(result){
            sendResponse(res,true,"User Data found",result);
        }
        else{
            sendResponse(res,false,"Failed to found",result);
        }
    } catch (error) {
        sendErrorResponse(res,false,error.message);   
    }
});

healthcareworkerRouter.get('/getAll',async(req,res,next)=>{
    const result = await healthCareWorkerSchema.find();
    if(result){
        sendResponse(res,true,"",result);
    }
    else{
        sendResponse(res,false,"",result);
    }
});



module.exports = healthcareworkerRouter;