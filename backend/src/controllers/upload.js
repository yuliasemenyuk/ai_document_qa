const pdf = require("pdf-parse");
const { v4: uuidv4 } = require("uuid");
const pc = require("../services/pineconeService");
const { exec } = require('child_process');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);
const getEmbeddings = require("../services/embeddingService");

const index = pc.index(process.env.INDEX_NAME);

const uploadController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: "Uploaded file must be a PDF." });
  }

  let docId;

  try {
    const textFromFile = (await pdf(req.file.buffer)).text;
    const embeddedText = await getEmbeddings(textFromFile);

    if (!embeddedText || !Array.isArray(embeddedText)) {
      return res.status(500).json({ error: "Error processing file" });
    }

    docId = uuidv4();
    const initialMetadata = {
      filename: req.file.originalname,
      uploadDate: new Date().toISOString(),
      fileType: "pdf",
      text: textFromFile
    };

    await index.upsert([{ 
      id: docId, 
      values: embeddedText,
      metadata: initialMetadata
    }]);

    // File upload successful, now attempt topic modeling
    const pythonScriptPath = path.join(__dirname, '..', '..', '..', 'python', 'generateMetadata.py');
    const { stdout, stderr } = await execPromise(`python3 ${pythonScriptPath} ${docId}`);
    console.log("Python script output:", stdout)

    let response = {
      message: "File uploaded successfully",
      docId: docId
    };

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      response.message += ", but topic modeling encountered an error";
    } else {
      const successMatch = stdout.match(/SUCCESS: Topics generated for document .+: (.+)/);
      if (successMatch) {
        response.message += " and topic modeling completed";
        response.keywords = successMatch[1].split(', ');
      } else {
        console.warn(`Unexpected Python script output: ${stdout}`);
        response.message += ", but topic modeling produced unexpected results";
      }
    }

    res.status(200).json(response);

  } catch (error) {
    console.error("Error in uploadController:", error);
    res.status(500).json({ 
      error: "Error processing file", 
      details: error.message 
    });
  }
};

module.exports = uploadController;

