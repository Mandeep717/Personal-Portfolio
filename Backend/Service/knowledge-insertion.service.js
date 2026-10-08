import { ProfileModel } from "../Model/profile.model.js"
import { PortfolioItemModel } from "../Model/portfolio.model.js"
import { KnowledgeModel } from "../Model/knowledge.model.js"

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

import { generateChunkEmbeddings } from "./embedding.service.js"


const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100
})


function buildPortfolioArticle(profile, portfolioItems) {

    let article = ""

    // -------------------------
    // PROFILE
    // -------------------------

    article += `ABOUT\n`

    article += `Name: ${profile.name || ""}\n`
    article += `Title: ${profile.title || ""}\n`
    article += `Bio: ${profile.bio || ""}\n\n`


    // -------------------------
    // CONTACT
    // -------------------------

    if (profile.contact) {

        article += `CONTACT\n`

        article += `Email: ${profile.contact.email || ""}\n`
        article += `Phone: ${profile.contact.phone || ""}\n`
        article += `Location: ${profile.contact.location || ""}\n\n`
    }


    // -------------------------
    // SOCIAL LINKS
    // -------------------------

    if (profile.socialLinks) {

        article += `SOCIAL LINKS\n`

        article += `GitHub: ${profile.socialLinks.github || ""}\n`
        article += `LinkedIn: ${profile.socialLinks.linkedin || ""}\n\n`
    }


    // -------------------------
    // CODING PROFILES
    // -------------------------

    if (profile.codingProfiles?.length) {

        article += `CODING PROFILES\n`

        for (const codingProfile of profile.codingProfiles) {

            article += `Platform: ${codingProfile.platform || ""}\n`
            article += `Username: ${codingProfile.username || ""}\n`
            article += `URL: ${codingProfile.url || ""}\n\n`
        }
    }


    // -------------------------
    // SKILLS
    // -------------------------

    if (profile.skills?.length) {

        article += `SKILLS\n`

        for (const skillCategory of profile.skills) {

            article += `${skillCategory.category || "Skills"}: `

            article += `${skillCategory.items?.join(", ") || ""}\n`
        }

        article += `\n`
    }


    // -------------------------
    // RESUME
    // -------------------------

    if (profile.resume?.extractedText) {

        article += `RESUME\n`

        article += `${profile.resume.extractedText}\n\n`
    }


    // -------------------------
    // PORTFOLIO
    // -------------------------

    if (portfolioItems?.length) {

        article += `PORTFOLIO\n\n`

        for (const item of portfolioItems) {

            article += `Type: ${item.type || ""}\n`
            article += `Title: ${item.title || ""}\n`

            if (item.organization) {
                article += `Organization: ${item.organization}\n`
            }

            if (item.description) {
                article += `Description: ${item.description}\n`
            }

            if (item.technologies?.length) {
                article += `Technologies: ${item.technologies.join(", ")}\n`
            }

            if (item.details?.length) {
                article += `Details:\n`
                article += `${item.details.join("\n")}\n`
            }

            if (item.startDate) {
                article += `Start Date: ${item.startDate}\n`
            }

            if (item.endDate) {
                article += `End Date: ${item.endDate}\n`
            }

            if (item.githubUrl) {
                article += `GitHub: ${item.githubUrl}\n`
            }

            if (item.liveUrl) {
                article += `Live URL: ${item.liveUrl}\n`
            }

            if (item.certificateUrl) {
                article += `Certificate: ${item.certificateUrl}\n`
            }

            article += `\n`
        }
    }


    return article.trim()
}


export async function ingestPortfolioKnowledge() {

    // 1. Get profile
    const profile = await ProfileModel
        .findOne()
        .lean()

    if (!profile) {
        throw new Error("Profile not found")
    }


    // 2. Get portfolio items
    const portfolioItems = await PortfolioItemModel
        .find()
        .sort({ displayOrder: 1 })
        .lean()


    // 3. Build knowledge article
    const article = buildPortfolioArticle(
        profile,
        portfolioItems
    )

    if (!article) {
        throw new Error("No portfolio information available")
    }


    // 4. Split article into chunks
    const documents = await textSplitter.createDocuments([
        article
    ])

    const chunks = documents
        .map(document => document.pageContent.trim())
        .filter(Boolean)

    if (!chunks.length) {
        throw new Error("No knowledge chunks generated")
    }


    // 5. Generate embeddings
    const embeddedChunks = await generateChunkEmbeddings(
        chunks,
        {
            source: "portfolio",
            section: "combined"
        }
    )


    // 6. Replace existing knowledge
    await KnowledgeModel.deleteMany({})

    await KnowledgeModel.insertMany(
        embeddedChunks
    )


    return {
        success: true,
        chunksCreated: embeddedChunks.length
    }
}


// Rebuild the complete portfolio knowledge base.
//
// This function intentionally reuses the existing ingestion pipeline.
// It is exposed separately so setup scripts can regenerate embeddings
// after portfolio data has been seeded or changed.
export async function rebuildKnowledgeBase() {

    const result = await ingestPortfolioKnowledge()

    if (!result.success) {
        throw new Error("Failed to rebuild knowledge base")
    }

    return result
}