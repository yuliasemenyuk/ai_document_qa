import os
import sys
import ssl
import traceback
from dotenv import load_dotenv
from pinecone import Pinecone
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from gensim import corpora
from gensim.models.ldamodel import LdaModel
from gensim.parsing.preprocessing import STOPWORDS

# Load environment variables
load_dotenv()

# Required for nltk.download
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download necessary NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('punkt_tab', quiet=True)

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Connect to Pinecone index
index_name = os.getenv("INDEX_NAME")
if not index_name:
    raise ValueError("INDEX_NAME not set in .env file")

index = pc.Index(index_name)

def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    return [token for token in tokens if token.isalnum() and token not in STOPWORDS]

def perform_topic_modeling(documents, num_topics=1, num_keywords=10):
    dictionary = corpora.Dictionary(documents)
    corpus = [dictionary.doc2bow(doc) for doc in documents]
    lda_model = LdaModel(corpus=corpus, id2word=dictionary, num_topics=num_topics, random_state=100)
    keywords = lda_model.show_topic(0, num_keywords)
    return [word for word, _ in keywords]

def process_document(doc_id):
    try:
        # Fetch document from Pinecone
        vector = index.fetch(ids=[doc_id])
        if doc_id not in vector.vectors:
            raise ValueError(f"Document with ID {doc_id} not found in the index")

        # Extract and preprocess text
        text = vector.vectors[doc_id].metadata.get("text", "")
        if not text.strip():
            raise ValueError(f"Empty text content for document {doc_id}")
        preprocessed_doc = preprocess_text(text)

        # Perform topic modeling
        keywords = perform_topic_modeling([preprocessed_doc], num_keywords=10)
        if not keywords:
            raise ValueError(f"No keywords generated for document {doc_id}")

        # Update metadata with keywords
        existing_metadata = vector.vectors[doc_id].metadata
        updated_metadata = {**existing_metadata, "topics": keywords}
        index.upsert(vectors=[{
            "id": doc_id,
            "values": vector.vectors[doc_id].values,
            "metadata": updated_metadata
        }])

        print(f"SUCCESS: Topics generated for document {doc_id}: {', '.join(keywords)}")
        sys.stdout.flush() 

    except Exception as e:
        print(f"ERROR: Failed to process document {doc_id}: {str(e)}", file=sys.stderr)
        sys.stderr.flush()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("ERROR: Usage: python script.py <document_id>", file=sys.stderr)
        sys.exit(1)
    
    doc_id = sys.argv[1]
    process_document(doc_id)