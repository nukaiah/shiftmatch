import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    isCurrentJob: { type: String, enum: ["Yes", "No"]},
    skills: { type: String }
}, { timestamps: true });


export default mongoose.model("Experience", experienceSchema);
