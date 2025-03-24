const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // Optional, if currently working
    isCurrentJob: { type: Boolean, default: false },
    description: { type: String },
    skills: [{ type: String }] // List of skills gained in this experience
}, { timestamps: true });


module.exports = mongoose.model("Experience", experienceSchema);
