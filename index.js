const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.NODE_MONGO_DB_URL;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;
mongoConnection.once("open", () => {
  console.log("MongoDB Connected");
});

const playerRoutes = require("./playerRoutes");
app.use("/players", playerRoutes);

app.listen(port, () => {
  console.log("Server is listening to " + `http://localhost:${port}`);
});
