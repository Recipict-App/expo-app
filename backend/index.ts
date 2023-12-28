import router from "./router";

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dot = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const URI = dot.parsed.MONDODB_URI;

// listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  console.log(URI);
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: any) => console.log(err));

app.use(express.json());
app.use("/", router);

const db = mongoose.connection;
db.on("error", (error: any) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
