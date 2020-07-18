const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Database
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DEFAULT_AUTH_DB}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Web server
const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json());

// Routes
app.get("/", (_, res) => res.json({ message: "Server is running" }));

app.use("/application", require("./routes/application"));
app.use("/products", require("./routes/products"));

app.use("/public", express.static("static"));

app.listen(port, () => {
  console.log(`CORS-enabled server is running on port: ${port}`);
});
