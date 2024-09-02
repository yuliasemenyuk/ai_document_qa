const express = require("express");
const cors = require("cors");
// const {initializePinecone} = require('./services/pineconeService');
const router = require("./routes/api/routes");

require("dotenv").config();


const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

async function startServer() {
//   try {
//     await initializePinecone();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
}

startServer();
