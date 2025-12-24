import natural from "natural";

const TfIdf = natural.TfIdf;

function findRelevantContext(query, texts, topK = 2) {
  const tfidf = new TfIdf();
  texts.forEach(text => tfidf.addDocument(text));
  const scores = [];

  tfidf.tfidfs(query, (i, score) => {
    scores.push({ index: i, score });
  });

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, topK).map(({ index }) => texts[index]).join("\n\n");
}

export default findRelevantContext;


// Usage example:
// const texts = ["text1", "text2", "text3"];
