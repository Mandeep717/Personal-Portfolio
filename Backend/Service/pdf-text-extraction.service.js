import { extractText, getDocumentProxy } from "unpdf"

export async function extractResumeText(fileBuffer) {
    if (!fileBuffer) {
        throw new Error("Resume file is required")
    }

    try {
        // Convert Buffer to Uint8Array for unpdf
        const pdfData = new Uint8Array(fileBuffer)

        // Create PDF document
        const pdf = await getDocumentProxy(pdfData)

        // Extract text from all pages
        const { totalPages, text } = await extractText(pdf, {
            mergePages: true
        })

        if (!text || !text.trim()) {
            throw new Error("No readable text found in the resume")
        }

        return {
            text: text.trim(),
            totalPages
        }

    } catch (error) {
        throw new Error(
            `Failed to extract resume text: ${error.message}`
        )
    }
}