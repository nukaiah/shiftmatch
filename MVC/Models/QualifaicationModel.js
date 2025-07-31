import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required: true},
    education:{type:String,required:true}, // e.g., Class X
    institution: { type: String, required: true }, // e.g., Harvard University
    course: { type: String, required: true }, // e.g., Bachelor of Science
    specialization: { type: String, required: true }, // e.g., Computer Science
    startYear: { type: Number, required: true }, // e.g., 2015
    endYear: { type: Number }, // e.g., 2019 (nullable in case the degree is ongoing)
},{ timestamps: true });

export default mongoose.model("Qualifications", qualificationSchema);
