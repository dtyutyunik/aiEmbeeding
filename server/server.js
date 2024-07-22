const express = require("express");
const app = express();
app.use(express.json()); //accepts json

const getEmbedding = require("./utils/getEmbedding.js");
const cosineSimilarity = require("./utils/cosineSimilarity.js");

app.post("/api/embedding", async (req, res) => {
  try {
    const { text1, text2 } = req.body;

    const embedding1 = await getEmbedding(text1);
    const embedding2 = await getEmbedding(text2);
    const similarity = cosineSimilarity(embedding1, embedding2);

    res.json({ similarity, embedding1, embedding2 });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("An error occured", error);
      res.status(500).json({
        error: {
          message: "An error occured during your request",
        },
      });
    }
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
