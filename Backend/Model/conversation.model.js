import { Schema, model } from "mongoose"


// Message schema
const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: {
                values: ["user", "assistant"],
                message: "Role must be either 'user' or 'assistant'"
            },
            required: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: true
    }
)


// Conversation schema
const conversationSchema = new Schema(
    {
        messages: {
            type: [messageSchema],
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false,
        strict: "throw"
    }
)


export const ConversationModel =
    model("Conversation", conversationSchema)