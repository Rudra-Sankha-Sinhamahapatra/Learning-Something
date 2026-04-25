import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    age: Number,
    city: String,
    salary: Number,
    skills: [String],
},
{ timestamps: true }
)

export const User = mongoose.model("User", userSchema);