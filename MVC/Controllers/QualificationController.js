// const express = require('express');
import express from 'express';
import mongoose from 'mongoose';
import qualificationSchema from '../Models/QualifaicationModel.js';
import { sendResponse, sendErrorResponse } from '../MiddleWares/Response.js';
import { checkAuth } from '../MiddleWares/CheckAuth.js';
const qualificationRouter = express.Router();


qualificationRouter.post('/add', checkAuth, async (req, res, next) => {
    try {
        const userId = { "userId": req.userId };
        const bodyData = req.body;
        const qualificationData = { ...userId, ...bodyData };
        const recordId = req.body._id;
        if (recordId === null || recordId === "") {
            const result = await qualificationSchema.create(qualificationData);
            if (result) {
                sendResponse(res, true, "Qualification added successfully", result);
            }
            else {
                sendResponse(res, false, "Failed to add qualification", result);
            }
        }
        else {
            const result = await qualificationSchema.updateOne({ "_id": recordId }, { $set: qualificationData });
            if (result) {
                sendResponse(res, true, "Qualification updated successfully", result);
            }
            else {
                sendResponse(res, false, "Failed to update qualification", result);
            }
        }

    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});

qualificationRouter.delete("/delete", checkAuth, async (req, res, next) => {
    try {
        var recordId = req.body._id;
        var result = await qualificationSchema.deleteOne({ "_id": recordId });
        if (result) {
            sendResponse(res, true, "Qualification deleted successfully", result);
        }
        else {
            sendResponse(res, true, "Failed to delete Qualification", result);
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});

qualificationRouter.post('/getById', checkAuth, async (req, res, next) => {
    try {
        const queryKey = { "userId": new mongoose.Types.ObjectId(req.userId) };
        const result = await qualificationSchema.find(queryKey);
        if (result) {
            sendResponse(res, true, "Qualification Found", result);
        }
        else {
            sendResponse(res, false, "Qualification Found", result);
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
});


export default qualificationRouter;