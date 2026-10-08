import { ChatOllama } from "@langchain/ollama"
import {
    HumanMessage,
    AIMessage,
    SystemMessage
} from "@langchain/core/messages"


const llm = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: process.env.OLLAMA_BASE_URL,
    temperature: 0
})


/*
    Generate an answer using:

    1. User query
    2. Retrieved portfolio knowledge chunks
    3. Conversation history
*/
export async function generateAnswerWithHistory(
    query,
    searchResults,
    conversationHistory = []
) {

    // Extract text from retrieved Knowledge documents
    const relevantChunks = searchResults
        .map((chunk) => chunk.text)
        .filter(Boolean)


    // Combine retrieved chunks into one context
    const context = relevantChunks
        .map(
            (chunkText, index) =>
                `Chunk ${index + 1}:\n${chunkText}`
        )
        .join("\n\n")


    // Messages sent to the LLM
    const messagesToLLM = [

        new SystemMessage(`
You are the personal AI assistant for Mandeep Boddu's portfolio.

Your purpose is to help visitors learn about Mandeep based only on
the information available in the portfolio context.

You can answer questions about:

- Mandeep's profile and background
- Education
- Technical skills
- Projects
- Achievements
- Resume
- Coding profiles
- GitHub and LinkedIn
- Interests and hobbies
- Career goals
- Other information explicitly available in the portfolio

RESPONSE RULES:

1. Use the portfolio context as the authoritative source for factual
   information about Mandeep.

2. Never invent or assume information that is not supported by the
   portfolio context.

3. Never mention internal implementation details such as:
   - chunks
   - embeddings
   - vector search
   - RAG
   - retrieval
   - databases
   - context
   - sources
   - similarity scores

4. Never say that information came from a "chunk", "context",
   "retrieved document", or similar internal mechanism.

5. Answer naturally as if you already know the portfolio information.

6. Keep responses concise but informative. Do not unnecessarily
   repeat the user's question.

7. For simple questions, answer directly in 1-3 sentences.

8. For questions asking about multiple things, use short bullet points
   when that improves readability.

9. When describing projects, mention the project's purpose and the
   most relevant technologies or capabilities available in the
   portfolio information.

10. If the requested information is not available, say:
   "I don't have that information in Mandeep's portfolio."

11. Do not provide information about people other than Mandeep unless
    that information is explicitly part of the portfolio.

12. If a question is unrelated to Mandeep's portfolio, politely explain
    that you can help with questions about Mandeep's background,
    education, skills, projects, achievements, interests, and career.

13. Do not refer to yourself as a language model or AI unless the user
    specifically asks about the chatbot itself.
`)

    ]


    // Add previous conversation history
    for (const message of conversationHistory) {

        if (message.role === "user") {

            messagesToLLM.push(
                new HumanMessage(message.content)
            )

        } else if (message.role === "assistant") {

            messagesToLLM.push(
                new AIMessage(message.content)
            )
        }
    }


    // Add retrieved context + current query
    messagesToLLM.push(
        new HumanMessage(`
PORTFOLIO CONTEXT:

${context || "No relevant portfolio information was found."}


USER QUERY:

${query}
        `)
    )


    // Generate answer
    const aiMessage = await llm.invoke(messagesToLLM)


    return aiMessage.content
}