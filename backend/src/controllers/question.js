const OpenAI = require("openai");
const pc = require("../services/pineconeService");
const getEmbeddings = require("../services/embeddingService");

const index = pc.index(process.env.INDEX_NAME);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const questionController = async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: "Invalid or empty question provided" });
  }

  try {
    let questionEmbedding;
    try {
      questionEmbedding = await getEmbeddings(question);
      if (!Array.isArray(questionEmbedding) || questionEmbedding.length === 0) {
        throw new Error("Invalid embedding generated");
      }
    } catch (embeddingError) {
      console.error("Error generating embeddings:", embeddingError);
      return res.status(500).json({ error: "Failed to process question", details: "Embedding generation failed" });
    }

    let queryResponse;
    try {
      queryResponse = await index.query({
        vector: questionEmbedding,
        topK: 3,
        includeMetadata: true
      });
      if (!queryResponse.matches || queryResponse.matches.length === 0) {
        return res.status(404).json({ error: "No relevant information found for the question" });
      }
    } catch (pineconeError) {
      console.error("Error querying Pinecone:", pineconeError);
      return res.status(500).json({ error: "Failed to retrieve relevant information", details: "Pinecone query failed" });
    }

    const context = queryResponse.matches.map(match => match.metadata.text).join("\n\n");
    if (context.trim().length === 0) {
      return res.status(404).json({ error: "Retrieved context is empty" });
    }

    const messages = [
      { role: "system", content: "You are a helpful assistant that answers questions based on the given context." },
      { role: "user", content: `Context: ${context}\n\nQuestion: ${question}` }
    ];

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 150
      });
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error("No response generated by OpenAI");
      }
    } catch (openaiError) {
      console.error("Error querying OpenAI:", openaiError);
      return res.status(500).json({ error: "Failed to generate answer", details: "OpenAI query failed" });
    }

    const answer = completion.choices[0].message.content.trim();

    res.status(200).json({ question, answer });
  } catch (error) {
    console.error("Unexpected error in questionController:", error);
    res.status(500).json({ error: "An unexpected error occurred while processing your question" });
  }
};

module.exports = questionController;