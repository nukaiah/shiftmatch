import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required: true},
    degree: { type: String, required: true }, // e.g., Bachelor of Science
    fieldOfStudy: { type: String, required: true }, // e.g., Computer Science
    institution: { type: String, required: true }, // e.g., Harvard University
    startYear: { type: Number, required: true }, // e.g., 2015
    endYear: { type: Number }, // e.g., 2019 (nullable in case the degree is ongoing)
    grade: { type: String }, // e.g., GPA 3.8
    description: { type: String } ,// Optional: Additional details
},{ timestamps: true });

export default mongoose.model("Qualifications", qualificationSchema);
