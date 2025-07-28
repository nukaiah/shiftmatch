import mongoose from 'mongoose';

const shiftPostSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    requirements: [{ type: String }],
    isActive: { type: String, required: true, default: "Active", enum: ["Active", "InActive"] },
    shiftType:{type:String,required:true,enum:["Fixed","Rotational","Flexible"]},
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

const ShiftPost = mongoose.model('Shifts', shiftPostSchema);

export default ShiftPost;
