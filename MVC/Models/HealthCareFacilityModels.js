import mongoose from 'mongoose';
import { encrypt,decrypt } from '../MiddleWares/EncryptDecrypt.js';

const healthCareFacilitySchema = new mongoose.Schema({

    organizationName: { type: String, required: true, unique: true, trim: true },
    organizationEmail: { type: String, required: true, unique: true, trim: true, lowercase: true, set: encrypt, get: decrypt },
    organizationPhone: { type: String, required: true, unique: true, trim: true, lowercase: true, set: encrypt, get: decrypt },
    organizationAddress: { type: String, required: true },
    organizationPassword: { type: String, set: encrypt, select: false },
    organizationImage: { type: String },
    organizationStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    verificationStatus: { type: String, required: true, enum: ["Pending", "Verified"], default: "Pending" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    roleId: { type: Number, required: true, default: 2 },
    roleName: { type: String, required: true, enum: ["Hospitals Admin", "Clinics Admin", "Nursing Homes Admin"], default: "Hospitals Admin" }

}, {
    timestamps: true,
    versionKey: false,
    toJSON: { getters: true, virtuals: false },
    toObject: { getters: true, virtuals: false }
});

healthCareFacilitySchema.index({ organizationEmail: 2,organizationName: 2, organizationPhone: 2 });

export default mongoose.model("HealthCareFacility", healthCareFacilitySchema);
