var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const dotenv = require("dotenv");
// dotenv.config();

const projectData = {};
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve("src/client/views/index.html"));
});

const port = 6060;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});

app.post("/postData", (req, res) => {
  projectData.imageUrl = req.body.imageUrl;
  projectData.latitude = req.body.latitude;
  projectData.longitude = req.body.longitude;
  projectData.high = req.body.high;
  projectData.low = req.body.low;
  projectData.country = req.body.country;

  console.log(projectData);
  res.send(projectData);
});

app.get("/all", function (req, res) {
  res.send(projectData);
});

module.exports = app;
