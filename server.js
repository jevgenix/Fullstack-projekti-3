// Tarvittavat moduulit
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
const mongoose = require("mongoose");

const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000;

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const router = require("./routes/api");
app.use("/api", router);

app.listen(port, () => console.log("Listen on port ", port));
