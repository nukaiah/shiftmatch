import mongoose from 'mongoose';
import { encrypt, decrypt } from '../MiddleWares/EncryptDecrypt.js';

const healthCareWorkerSchema = new mongoose.Schema(
    {
        roleId: { type: Number, required: true, enum: [1, 3], default: 3 },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, set: encrypt, get: decrypt },
        mobileNumber: { type: String, required: true, unique: true, trim: true, set: encrypt, get: decrypt },
        gender: { type: String, enum: ["Male", "Female", "Other"]},
        password: { type: String, set: encrypt },
        dob: { type: Date },
        imageUrl: { type: String },
        verificationStatus: { type: String, required: true, enum: ["Pending", "Verified"], default: "Pending" },
        role: { type: String },
        accountStatus: { type: String, required: true, enum: ["Active", "Inactive", "Suspended"], default: "Active" }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { getters: true, virtuals: false },
        toObject: { getters: true, virtuals: false }
    },
);

healthCareWorkerSchema.index({ email: 1, mobileNumber: 1 });

export default mongoose.model('Healthcareworker', healthCareWorkerSchema);

