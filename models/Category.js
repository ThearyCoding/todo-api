const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    trim: true
  },
  color: {
    type: String,
    required: [true, "Color is required"],
    trim: true,
    match: [
      /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      "Please enter a valid HEX color code"
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
