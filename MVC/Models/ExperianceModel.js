import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String }, // Optional, if currently working
    isCurrentJob: { type: Boolean, default: false },
    description: { type: String },
    skills: [{ type: String }] // List of skills gained in this experience
}, { timestamps: true });


export default mongoose.model("Experience", experienceSchema);
