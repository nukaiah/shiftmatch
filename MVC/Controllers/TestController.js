const express = require('express');
const userModel = require('../Models/HealthCareWorkerModel');
const testRouter = express.Router();

testRouter.get('/getTest', async (req, res, next) => {
    try {
        var result = await userModel.find();
        if (result) {
            res.status(200).json({
                status: true,
                message: "Users data found successfully",
                length: result.length,
                data: result
            });
        }
        else {

        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
        next(error);
    }

});


testRouter.post('/addTest', async (req, res, next) => {
    try {
        var bodyData = req.body;
        console.log(bodyData);
        var result = await userModel.create(bodyData);
        console.log(result);
        if (result) {
            res.status(200).json({
                status: true,
                message: "Users data found successfully",
                data: result
            });
        }
        else { }
    } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        });
    }
});


testRouter.post('/updateTest', async (req, res, next) => { 
    var result = await userModel.findByIdAndUpdate({_id:"67dd2c169b70b0af92b4d187"},{$set:req.body});
    console.log(result);

});


testRouter.delete('/deleteTest', async (req, res, next) => { 

});

testRouter.post('/pagination',async (req,res,next)=>{
    try {
        const page = parseInt(req.body.pageCount) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        var result = await userModel.find().skip(skip).limit(limit);   
        if(result){
            res.status(200).json({
                status:true,
                message:"Users find successfully",
                data:result
            });
        }
        else{
            res.status(200).json({
                status:true,
                message:"No users found",
                data:result
            });
        }
    } catch (error) {
        res.status(500).json({
            status:true,
            message:"No users found",
            data:result.message
        });
    }
});

module.exports = testRouter;