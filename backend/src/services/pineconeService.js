
const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});

// pc.createIndex({
//     name: 'file-qa-index',
//     dimension: 384,
//     metric: 'cosine',
//     spec: {
//       serverless: {
//         cloud: 'aws',
//         region: 'us-east-1'
//       }
//     },
//     deletionProtection: 'disabled',
//   });

module.exports = pc;

// let pinecone;

// async function initializePinecone() {
//     if (!pinecone) {
//       try {
//         pinecone = new Pinecone({ 
//           apiKey: process.env.PINECONE_API_KEY
//         });
        
//         console.log("Pinecone initialized successfully");
//       } catch (error) {
//         console.error("Error initializing Pinecone:", error);
//         throw error;
//       }
//     }
//     return pinecone;
// }  

// function getPineconeClient() {
//   if (!pinecone) {
//     throw new Error("Pinecone client not initialized. Call initializePinecone first.");
//   }
//   return pinecone;
// }

// module.exports = {
//     initializePinecone,
//     getPineconeClient
// }
