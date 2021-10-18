const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  playerName: { type: String },
  from: { type: String },
  price: { type: String },
  isPlaying: { type: Boolean },
  description: { type: String },
  imageUri: { type: String },
});

const playerModel = mongoose.model("players", playerSchema);

module.exports = playerModel;
