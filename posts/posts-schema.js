import mongoose from "mongoose";
const postsSchema = new mongoose.Schema({
    userId: {type: {
        role: {type: String, enum: ['rangers', 'hikers'], required:true},
        item: {type: mongoose.Schema.Types.ObjectId, ref: 'userId.role', required:true},
    }, required: true},
    parkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parks'
    },
    text: {type: String, required: true},
    datePosted: { type: Date, default: Date.now, required: true },
    location: String,
    attachment: String,
    likes: {type: Number, default: 0}, 
    numRangerLikes: {type: Number, default: 0}
}, { collection: "posts" });
export default postsSchema;