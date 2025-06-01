const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema({
  name: String,
  category: String,
  size: String,
  color: String,
  price: Number,
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Clothing", clothingSchema);
