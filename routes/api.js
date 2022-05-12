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
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Message.findById(id, (err, message) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(message);
    }
  });
});

// Creating one
router.post("/add", async (req, res) => {
  const message = new Message({
    name: req.body.name,
    message: req.body.message,
  });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Message.findByIdAndUpdate(id, update, options);
    res.send(result);
  } catch (err) {
    res.status(500).json("Db error ", err);
  }
});

// adding comment
router.put("/comment/:id", async (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  const query = Message.findByIdAndUpdate(
    id,
    { $push: { comments: comment } },
    { safe: true, upsert: true, new: true }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  });

  // test
  console.log(comment);
  res.send(query);
});

// Update votes
router.patch("/:id/vote", (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;

  Message.findById(id).then((message) => {
    console.log(message.votes);
    if (vote === "up") {
      message.votes++;
    } else if (vote === "down") {
      message.votes--;
    } else {
      res.status(400).json({ message: "Bad request" });
    }
    message.save().then((message) => {
      res.status(201).json({
        message: "Votes updated",
        message,
      });
    });
  });
});

// Deleting one
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Message.findByIdAndDelete(id, (err) => {
    if (err) res.status(500).json("Database error", err);
    console.log("Message is deleted successfully");
    res.json("Message is deleted successfully");
  });
});

module.exports = router;
