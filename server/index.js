require("dotenv").config();
const express = require("express");
const app = express();
const postRoutes = require("./routes/posts.js");
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use("/", postRoutes);
app.listen(port);
