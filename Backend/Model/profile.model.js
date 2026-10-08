import { Schema, model } from "mongoose";

const profileSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        bio: {
            type: String,
            required: true
        },

        contact: {
            email: String,
            phone: String,
            location: String
        },

        socialLinks: {
            github: String,
            linkedin: String
        },

        codingProfiles: [
            {
                platform: {
                    type: String,
                    required: true
                },

                username: String,

                url: {
                    type: String,
                    required: true
                }
            }
        ],

        skills: [
            {
                category: String,

                items: [
                    String
                ]
            }
        ],

        resume: {
            url: String,
            fileName: String,
            extractedText: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
        strict: "throw"
    }
);

export const ProfileModel = model("Profile", profileSchema);