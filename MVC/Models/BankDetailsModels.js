import { encrypt, decrypt } from '../MiddleWares/EncryptDecrypt.js';

import mongoose from 'mongoose';

const bankDetailsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true, set: encrypt, get: decrypt },
    ifscCode: { type: String, required: true, set: encrypt, get: decrypt },
    branch: { type: String, required: true }
}, {
    timestamps: true, 
    toJSON: { getters: true },
    toObject: { getters: true }
});


bankDetailsSchema.index({ accountNumber: 3 });

export default mongoose.model("Bankdetails", bankDetailsSchema);