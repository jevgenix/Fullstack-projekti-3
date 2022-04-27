const express = require("express");
const router = express.Router();
const Message = require("../models/forum");

// Gettin all data
router.get("/getall", async (req, res) => {
  try {
    const message = await Message.find({}, null, { limit: 50 });
    if (message.length > 0) {
      res.send(message);
    } else {
      res.send("No messages found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", (req, res) => {});

// Creating one
router.post("/add", async (req, res) => {
  const message = new Message({
    name: req.body.name,
    message: req.body.message,
    votes: req.body.votes,
  });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/update/:id", (req, res) => {});

// Deleting one
router.delete("/delete/:id", (req, res) => {});

module.exports = router;
