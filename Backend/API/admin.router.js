import exp from 'express'
import { PortfolioItemModel } from '../Model/portfolio.model.js'
import { AdminModel } from '../Model/admin.model.js'
import { ProfileModel } from '../Model/profile.model.js'
import {compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {verifyToken} from '../Middleware/verify-token.middleware.js'
import multer from 'multer'
import { extractResumeText } from '../Service/pdf-text-extraction.service.js'
import { ingestPortfolioKnowledge } from '../Service/knowledge-insertion.service.js'

export const adminRouter = exp.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {

        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"))
        }

        cb(null, true)
    }
})

// Admin login route
adminRouter.post("/auth/login", async (req, res) => {
    let { username, password } = req.body
    let adminInDb = await AdminModel.findOne({ username })
    if (!adminInDb) {
        return res.status(404).json({ success: false, message: "Admin not found" })
    }
    let isMatch = await compare(password, adminInDb.password)
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid password" })
    }
    let token = jwt.sign({ _id: adminInDb._id, username: adminInDb.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
    res.status(200).json({ success: true, message: "Login successful"})
})

//Admin logout
adminRouter.post("/auth/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: false })
    res.status(200).json({ success: true, message: "Logout successful" })
})

//Create profile
adminRouter.post("/profile", verifyToken, async (req, res) => {
    const existingProfile = await ProfileModel.findOne()
    if (existingProfile) {
        return res.status(409).json({
            success: false,
            message: "Profile already exists"
        })
    }
    const newProfile = await ProfileModel.create(req.body)
    res.status(201).json({
        success: true,
        message: "Profile created",
        data: newProfile
    })
})

//Update profile
adminRouter.put("/profile", verifyToken, async (req, res) => {

    const profile = await ProfileModel.findOne()

    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        })
    }

    const updatedProfile =
        await ProfileModel.findByIdAndUpdate(
            profile._id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

    res.status(200).json({
        success: true,
        message: "Profile updated",
        data: updatedProfile
    })
})

//Add new portfolio
adminRouter.post("/portfolios", verifyToken, async (req, res) => {
    let portfolioData = req.body
    let newPortfolioItem = await PortfolioItemModel.create(portfolioData)
    res.status(201).json({ success: true, message: "Portfolio item created", data: newPortfolioItem })
})

//Update portfolio item
adminRouter.put("/portfolios/:id", verifyToken, async (req, res) => {
    let portfolioId = req.params.id
    let portfolioInDb = await PortfolioItemModel.findById(portfolioId)
    if (!portfolioInDb) {
        return res.status(404).json({ success: false, message: "Portfolio item not found" })
    }
    let updatedPortfolioItem = await PortfolioItemModel.findByIdAndUpdate(portfolioId, req.body, { new: true, runValidators: true })
    res.status(200).json({ success: true, message: "Portfolio item updated", data: updatedPortfolioItem })
})

//Get profile
adminRouter.get("/profiles", verifyToken, async (req, res) => {
    let profilesInDb = await ProfileModel.find()
    res.status(200).json({ success: true, message: "Profiles retrieved", data: profilesInDb })
})

//Get portfolio by id
adminRouter.get("/portfolios/:id", verifyToken, async (req, res) => {
    let portfolioId = req.params.id
    let portfolioInDb = await PortfolioItemModel.findById(portfolioId)
    if (!portfolioInDb) {
        return res.status(404).json({ success: false, message: "Portfolio item not found" })
    }
    res.status(200).json({ success: true, message: "Portfolio item retrieved", data: portfolioInDb })
})

//Delete portfolio item by id
adminRouter.delete("/portfolios/:id", verifyToken, async (req, res) => {
    let portfolioId = req.params.id
    let portfolioInDb = await PortfolioItemModel.findById(portfolioId)
    if (!portfolioInDb) {
        return res.status(404).json({ success: false, message: "Portfolio item not found" })
    }
    await PortfolioItemModel.findByIdAndDelete(portfolioId)
    res.status(200).json({ success: true, message: "Portfolio item deleted" })
})

// Update resume
adminRouter.put("/resume", verifyToken, upload.single("resume"), async (req, res) => {
        const profileInDb = await ProfileModel.findOne()
        if (!profileInDb) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            })
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF is required"
            })
        }
        const { text, totalPages } =
            await extractResumeText(req.file.buffer)
        profileInDb.resume = {
            url: profileInDb.resume?.url || "",
            fileName: req.file.originalname,
            extractedText: text
        }
        await profileInDb.save()
        res.status(200).json({
            success: true,
            message: "Resume uploaded and text extracted successfully",
            data: {
                fileName: req.file.originalname,
                totalPages
            }
        })
    }
)

// Rebuild the knowledge base
adminRouter.post("/knowledge/rebuild", verifyToken, async (req, res) => {

    const profileInDb = await ProfileModel.findOne()

    if (!profileInDb) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        })
    }

    try {
        const result = await ingestPortfolioKnowledge()

        return res.status(200).json({
            success: true,
            message: "Knowledge base rebuilt successfully",
            data: result
        })

    } catch (error) {
        console.error("Knowledge rebuild failed:", error)

        return res.status(500).json({
            success: false,
            message: "Error rebuilding knowledge base"
        })
    }
})