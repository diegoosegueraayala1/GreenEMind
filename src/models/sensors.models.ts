import mongoose, { Decimal128, Schema } from "mongoose";

export interface reading {
    datetime: Date,
    value: Decimal128
}
export interface Sensor {
    productID: mongoose.Types.ObjectId,
    sensor_name: String,
    readings: reading
};

const sensorsSchema: Schema = new Schema({
    productID: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    sensor_name: {
        type: String,
        required: true
    },
    readings: [{
        datetime: {
            type: Date,
            default: new Date(),
            required: true,
        },
        value: {
            type: mongoose.Types.Decimal128,
            required: true
        }
    }]
});

export default mongoose.model('sensors', sensorsSchema);