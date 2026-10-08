import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
    strict: "throw"
})

export const AdminModel = model('Admin', adminSchema)

