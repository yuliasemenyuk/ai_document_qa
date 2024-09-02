const OpenAI = require("openai");
const pc = require("../services/pineconeService");
const getEmbeddings = require("../services/embeddingService");

const index = pc.index(process.env.INDEX_NAME);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const questionController = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const questionEmbedding = await getEmbeddings(question);
    const queryResponse = await index.query({
        vector: questionEmbedding,
        topK: 3,
        includeMetadata: true
      });

    console.log(queryResponse.matches);

    const context = queryResponse.matches.map(match => match.metadata.text).join("\n\n");

    const messages = [
        { role: "system", content: "You are a helpful assistant that answers questions based on the given context." },
        { role: "user", content: `Context: ${context}\n\nQuestion: ${question}` }
    ];

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 150
    });

    const answer = completion.choices[0].message.content.trim();

    res.status(200).json({ question, answer });
  } catch (error) {
    console.error("Error in questionController:", error);
    res.status(500).json({ error: "An error occurred while processing your question" });
  }
};

module.exports = questionController;