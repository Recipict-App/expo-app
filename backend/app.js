const functions = require("@google-cloud/functions-framework");
const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;

functions.http("helloHttp", async (req, res) => {
  const base64ImageData = req?.body?.base64ImageData;

  const client = new DocumentProcessorServiceClient();
  const projectId = "recipict-gcp";
  const locationId = "us";
  const processorId = "c183a41e6733f2c9";

  // Request body to Document AI
  const request = {
    name: `projects/${projectId}/locations/${locationId}/processors/${processorId}`,
    skipHumanReview: true,
    rawDocument: {
      content: base64ImageData, // pass to API
      mimeType: "image/jpeg",
    },
  };

  try {
    const [result] = await client.processDocument(request);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
