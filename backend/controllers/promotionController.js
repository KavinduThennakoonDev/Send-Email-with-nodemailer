const Promotion = require("../models/promotion");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();

    // Sending email
    const mailOptions = {
      from: "",
      to: req.body.userEmail,
      subject: req.body.promotionName,
      text: req.body.description,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all promotions
exports.getAllPromotions = async (req, res) => {
  try {
    // Fetch all promotions from the database
    const promotions = await Promotion.find();

    // Respond with the array of promotions
    res.status(200).json(promotions);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a promotion by ID
exports.deletePromotion = async (req, res) => {
  try {
    const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!deletedPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.json({ message: "Promotion deleted successfully", deletedPromotion });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPromotion);
  } catch (error) {
    console.error("Error updating promotion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
