async function getEmbeddings(text) {
    const embeddings = await import("@themaximalist/embeddings.js");
    return embeddings.default(text);
}

module.exports = getEmbeddings;