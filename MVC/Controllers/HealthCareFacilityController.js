import express from 'express';
import mongoose from 'mongoose';
import { checkAuth } from '../MiddleWares/CheckAuth.js';
import { sendResponse, sendErrorResponse } from '../MiddleWares/Response.js';
import { encrypt,decrypt } from '../MiddleWares/EncryptDecrypt.js';
import healthCareFacilitySchema from '../Models/HealthCareFacilityModels.js';
const healthCareFacilityRouter = express.Router();

healthCareFacilityRouter.post('/register', checkAuth, async (req, res, next) => {
    try {
        if (req.roleId === 1) {
            const body = req.body;
            const userId = { "addedBy": new mongoose.Types.ObjectId(req.userId) };
            const healthCareFacilityData = { ...userId, ...body };
            const result = await healthCareFacilitySchema.create(healthCareFacilityData);
            if (result) {
                sendResponse(res, true, "Facility onboarded successfully.", result);
            }
            else {
                sendResponse(res, false, "Failed to onboarded a facility.");
            }
        }
        else {
            sendResponse(res, false, "You are not a super admin to create a organization", {});
        }

    } catch (error) {
        sendErrorResponse(res, false, error.message,{});
    }
});

healthCareFacilityRouter.post('/getFacility', checkAuth, async (req, res, next) => {
    try {
        const query = { "addedBy": new mongoose.Types.ObjectId(req.userId) };
        const result = await healthCareFacilitySchema.aggregate([
            { $match: query },
            { $project: { organizationPassword: 0 } }
        ]);
        if (result.length > 0) {
            result.forEach(facility => {
                facility.organizationEmail = decrypt(facility.organizationEmail);
                facility.organizationPhone = decrypt(facility.organizationPhone);
            });
            sendResponse(res, true, "Facility founded successfully.", result);
        }
        else {
            sendResponse(res, false, "Failed to find a facilities.");
        }
    } catch (error) {
        sendErrorResponse(res, false, error.message);
    }
})

export default healthCareFacilityRouter;