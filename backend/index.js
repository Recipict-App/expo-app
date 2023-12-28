const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());
const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;
const client = new DocumentProcessorServiceClient();

const projectId = "recipicttest";
const locationId = "us"; // Format is 'us' or 'eu'
const processorId = "9f398eb111a3ed90"; // Create processor in Cloud Console

const fs = require("fs");

app.post("/process-image", async (req, res) => {
  const client = new DocumentProcessorServiceClient();
  const { imageURI } = req.body;

  console.log("\nURI obtained: " + imageURI + "\n");

  const base64Image = fs.readFileSync(imageURI, "base64");

  // Now you can use base64Image in your request
  const request = {
    name: `projects/${projectId}/locations/${locationId}/processors/${processorId}`,
    rawDocument: {
      content: base64Image, // pass to API
      mimeType: "image/jpeg",
    },
  };

  try {
    const [result] = await client.processDocument(request);
    res.json(result);
    console.log(result);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
