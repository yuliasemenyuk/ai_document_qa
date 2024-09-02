const pdf = require("pdf-parse");
const { v4: uuidv4 } = require("uuid");
const pc = require("../services/pineconeService");
const getEmbeddings = require("../services/embeddingService");

const index = pc.index(process.env.INDEX_NAME);

const uploadController = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const textFromFile = (await pdf(req.file.buffer)).text;
  const embeddedText = await getEmbeddings(textFromFile);

  if (!embeddedText || !Array.isArray(embeddedText)) {
    return res.status(500).send("Error processing file");
  }

  await index.upsert([{ 
    id: uuidv4(), 
    values: embeddedText,
    metadata: { text: textFromFile }
  }]);

  res.status(200).json({message: "File uploaded successfully"});
};

module.exports = uploadController;


