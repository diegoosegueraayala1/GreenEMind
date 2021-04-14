import mongoose, { Schema } from "mongoose";

export interface Product {
    registration_date: String,
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