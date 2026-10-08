import dotenv from "dotenv"
import mongoose from "mongoose"

import { connectDatabase } from "../Backend/Config/database.js"
import { rebuildKnowledgeBase } from "../Backend/Service/knowledge-insertion.service.js"


dotenv.config()


const rebuild = async () => {

    try {

        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is missing. Configure it in your local .env file."
            )
        }


        await connectDatabase()

        console.log("Connected to MongoDB.")
        console.log("Rebuilding portfolio knowledge base...")


        const result = await rebuildKnowledgeBase()


        console.log("")
        console.log("Knowledge base rebuilt successfully.")
        console.log(`Chunks created: ${result.chunksCreated}`)


        await mongoose.connection.close()

        process.exit(0)

    } catch (error) {

        console.error("")
        console.error("Knowledge base rebuild failed:")
        console.error(error)


        try {
            await mongoose.connection.close()
        } catch {}


        process.exit(1)
    }
}


rebuild()