const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  promotionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  promotionKey: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  promotionType: {
    type: String,
    enum: ["Promotion", "Discount"],
    required: true,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
