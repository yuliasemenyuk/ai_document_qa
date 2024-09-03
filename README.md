AI-Enhanced Document QA System
Setup Guide
Prerequisites:

Node.js (v14 or later)
Python (v3.7 or later)
npm (usually comes with Node.js)
pip (Python package manager)

Setup Steps:

Clone and open the repository
git clone https://github.com/yuliasemenyuk/ai-document-qa.git
cd ai-document-qa

Set up the Node.js backend
cd backend
npm install

Set up the React frontend
cd ../frontend
npm install

Set up the Python environment
cd ../python
pip install -r requirements.txt

Set up environment variables

Copy the .env.example file to .env in both the backend and frontend directories.
Fill in the necessary API keys and other configuration values in these .env files.


Start the backend server
cd ../backend
npm start

Start the frontend development server
cd ../frontend
npm start

Access the application

Open your browser and go to http://localhost:3000 (or the port specified in your frontend configuration).



Brief Approach Explanation
Frontend (React)

Provides a user interface for document upload and question asking.
Implemented using React with styled-components for styling.
Communicates with the backend via RESTful API calls.

Backend (Node.js/Express)

Handles API requests from the frontend.
Manages file uploads and stores document embeddings in Pinecone.
Coordinates with the Python script for topic modeling.
Integrates with OpenAI for question answering.

Document Processing

Uses pdf-parse to extract text from uploaded PDF documents.
Generates embeddings for the extracted text using a pre-trained model.

Topic Modeling (Python)

Implemented as a separate Python script.
Uses NLTK and Gensim for text preprocessing and LDA topic modeling.
Generates keywords/topics for uploaded documents.

Vector Database (Pinecone)

Stores document embeddings and metadata.
Enables efficient similarity search for relevant documents.

Question Answering

Uses Pinecone to find relevant document segments based on the question.
Utilizes OpenAI's GPT model to generate answers based on the retrieved context.