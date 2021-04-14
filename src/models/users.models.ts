import mongoose, { Schema } from "mongoose";

export interface User {
    name: String,
    last_name: String,
    birthdate: Date,
    email: String,
    nickname: String,
    password: String,
    registration_date?: Date,
    status?: String
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    registration_date: {
        type: String,
        default: new Date(),
    },
    status: {
        type: String,
        default: 'A'
    }
});

export default mongoose.model('users', userSchema);