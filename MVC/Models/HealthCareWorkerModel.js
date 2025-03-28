const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../MiddleWares/EncryptDecrypt');

const healthCareWorkerSchema = new mongoose.Schema(
    {
        roleId: { type: Number, required: true,enum:[1,3], default: 3 },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, set: encrypt, get: decrypt },
        mobileNumber: { type: String, required: true, unique: true, trim: true ,set: encrypt, get: decrypt },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        dob: { type: Date },
        password: { type: String, set: encrypt },
        imageUrl: { type: String },
        verificationStatus: { type: String, required: true, enum: ["Pending", "Verified"], default: "Pending" },
        role: { type: String, required: true },
        accountStatus: { type: String, required: true, enum: ["Active", "Inactive", "Suspended"], default: "Active" }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { getters: true,virtuals: false  },
        toObject: { getters: true,virtuals: false }
    },
);

healthCareWorkerSchema.index({ email: 1 });
healthCareWorkerSchema.index({ mobileNumber: 1 });


module.exports = mongoose.model('Healthcareworker', healthCareWorkerSchema);

