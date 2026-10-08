import exp from 'express'
import {PortfolioItemModel} from '../Model/portfolio.model.js'
import {ProfileModel} from '../Model/profile.model.js'
import { generateEmbedding } from "../Service/embedding.service.js"
import { generateAnswerWithHistory } from "../Service/llm.service.js"
import { KnowledgeModel } from "../Model/knowledge.model.js"
import { ConversationModel } from "../Model/conversation.model.js"

export const viewerRouter = exp.Router()

// Get profile for the viewer
viewerRouter.get("/profile", async (req, res) => {
    let profile = await ProfileModel.findOne().select("-resume.extractedText")
    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Profile retrieved",
        data: profile
    })
})

// Get all portfolio items for the viewer
viewerRouter.get("/portfolios", async (req, res) => {
    let portfolios = await PortfolioItemModel.find().sort({ displayOrder: 1 })
    res.status(200).json({
        success: true,
        message: "Portfolios retrieved",
        data: portfolios
    })
})

// Get a specific portfolio item by ID for the viewer
viewerRouter.get("/portfolios/:id", async (req, res) => {
    let portfolioId = req.params.id
    let portfolio = await PortfolioItemModel.findById(portfolioId)
    if (!portfolio) {
        return res.status(404).json({
            success: false,
            message: "Portfolio not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Portfolio retrieved",
        data: portfolio
    })
})

//Get contact information for the viewer
viewerRouter.get("/contact", async (req, res) => {
    let profile = await ProfileModel.findOne()
    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        })
    }
    let contactInfo = profile.contact
    res.status(200).json({
        success: true,
        message: "Contact information retrieved",
        data: contactInfo
    })
})

//Get resume
viewerRouter.get("/resume", async (req, res) => {

    const profile = await ProfileModel
        .findOne()
        .select("resume.url resume.fileName")

    if (!profile?.resume?.url) {
        return res.status(404).json({
            success: false,
            message: "Resume not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Resume retrieved",
        data: profile.resume
    })
})

//AI chatbot
viewerRouter.post("/chat", async (req, res) => {

    const { query, conversationId } = req.body

    if (!query || !query.trim()) {
        return res.status(400).json({
            success: false,
            message: "Query is required"
        })
    }

    const cleanQuery = query.trim()

    let conversation

    // Continue existing conversation
    if (conversationId) {

        conversation =
            await ConversationModel.findById(conversationId)

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            })
        }

    } else {

        // Create new conversation
        conversation =
            await ConversationModel.create({
                messages: []
            })
    }

    const conversationHistory =
        conversation.messages
            .slice(-10)
            .map((message) => ({
                role: message.role,
                content: message.content
            }))

    const queryEmbedding =
        await generateEmbedding(cleanQuery)

    const searchResults =
        await KnowledgeModel.aggregate([
            {
                $vectorSearch: {
                    index: "portfolio_index",
                    path: "embedding",
                    queryVector: queryEmbedding,
                    numCandidates: 50,
                    limit: 5
                }
            },
            {
                $project: {
                    _id: 0,
                    text: 1,
                    chunkIndex: 1,
                    metaData: 1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ])

    conversation.messages.push({
        role: "user",
        content: cleanQuery
    })

    const answer =
        await generateAnswerWithHistory(
            cleanQuery,
            searchResults,
            conversationHistory
        )

    conversation.messages.push({
        role: "assistant",
        content: answer
    })

    await conversation.save()

    res.status(200).json({
        success: true,
        message: "Chat response generated",
        data: {
            conversationId: conversation._id,
            answer
        }
    })
})