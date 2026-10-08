import { Schema, model } from 'mongoose';

const knowledgeSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    chunkIndex: {
        type: Number,
        required: true
    },
    embedding: {
        type: [Number],
        required: true
    },
    metaData: {
        source: {
            type: String,
            required: true
        },
        section: {
            type: String,
            required: true
        }
    }
},{
    timestamps: true,
    versionKey: false,
    strict: "throw"
})

export const KnowledgeModel = model('Knowledge', knowledgeSchema)