import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: "String",
            required: true,
            unique: true
        },
        password: {
            type: "String",
            required: true
        },
        score: {
            type: "Number",
            default: 0
        },
        avatar: {
            type: "String",
            default: "",
            required: false
        }


    },
    {timestamps: true}
)

export default mongoose.model('User', UserSchema)