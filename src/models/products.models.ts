import mongoose, { Schema } from "mongoose";
import userSchema from "./users.models";

export interface Product {
    registration_date?: Date,
    nickname: String,
    status: String,
    userID: mongoose.Types.ObjectId
}

const productsSchema: Schema = new Schema ({
    nickname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'A',
        required: true
    },
    registration_date: {
        type: Date,
        default: new Date(),
        required: true
    },
    userID : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export default mongoose.model('products', productsSchema);