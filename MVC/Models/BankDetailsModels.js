const { decrypt, encrypt } = require('../MiddleWares/EncryptDecrypt');
const mongoose = require('mongoose');

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


bankDetailsSchema.index({ accountNumber: 1 });

module.exports = mongoose.model("Bankdetails", bankDetailsSchema);