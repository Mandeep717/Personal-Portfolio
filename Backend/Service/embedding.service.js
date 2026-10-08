import { OllamaEmbeddings } from "@langchain/ollama"

const embeddingModel = new OllamaEmbeddings({
    model: "embeddinggemma",
    baseUrl: process.env.OLLAMA_BASE_URL
})

export async function generateEmbedding(text) {
    if (!text || !text.trim()) {
        throw new Error("Text is required to generate embedding")
    }

    return await embeddingModel.embedQuery(text.trim())
}

export async function generateChunkEmbeddings(
    chunks,
    metaData = {
        source: "portfolio",
        section: "combined"
    }
) {
    if (!Array.isArray(chunks) || chunks.length === 0) {
        throw new Error("Chunks are required to generate embeddings")
    }

    const chunkEmbeddings = []

    for (const [index, chunk] of chunks.entries()) {

        const chunkText = chunk?.trim()

        if (!chunkText) {
            continue
        }

        const embedding = await generateEmbedding(chunkText)

        chunkEmbeddings.push({
            text: chunkText,
            chunkIndex: index,
            embedding,
            metaData: {
                source: metaData.source,
                section: metaData.section
            }
        })
    }

    return chunkEmbeddings
}