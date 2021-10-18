const express = require("express");
const playerModal = require("../playerModal");

const router = express.Router();

const usersCodeArray = [];

router.get("/", async (req, res) => {
  try {
    const playerData = await playerModal.find();
    if (playerData != null) {
      res.send(playerData);
    } else {
      res.send("No Data Available");
    }
  } catch (err) {
    res.status(500).send("error");
  }
});

router.post("/", async (req, res) => {
  try {
    const value = req.body;
    const { usersData, data } = value;
    if (usersCodeArray.includes(usersData.code)) {
      res.send("Code Already Added");
    } else {
      usersCodeArray.push(usersData.code);
      const savedData = new playerModal(data);
      let response = await savedData.save();
      res.send(response);
    }
  } catch (err) {
    res.status(500).send("error");
  }
});

router.get("/search", async (req, res) => {
  try {
    const teamName = req.query.from;
    const result = await playerModal.find({
      from: { $regex: teamName, $options: "i" },
    });
    res.send(result);
  } catch (err) {
    res.status(500).send("error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await playerModal.findById(id);
    res.send(data);
  } catch (err) {
    res.status(500).send("error");
  }
});

module.exports = router;
