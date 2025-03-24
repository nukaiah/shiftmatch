const mongoose = require('mongoose');

const shiftPostSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    requirements: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

const ShiftPost = mongoose.model('Shifts', shiftPostSchema);
module.exports = ShiftPost;
