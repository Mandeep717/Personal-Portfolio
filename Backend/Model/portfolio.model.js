import { Schema, model } from "mongoose";

const portfolioItemSchema = new Schema(
    {
        type: {
            type: String,
            enum: [
                "education",
                "experience",
                "project",
                "achievement"
            ],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        organization: {
            type: String
        },

        description: {
            type: String
        },

        technologies: [
            String
        ],

        details: [
            String
        ],

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
        },

        githubUrl: {
            type: String
        },

        liveUrl: {
            type: String
        },

        certificateUrl: {
            type: String
        },

        featured: {
            type: Boolean,
            default: false
        },

        displayOrder: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false,
        strict: "throw"
    }
);

export const PortfolioItemModel = model("PortfolioItem", portfolioItemSchema);