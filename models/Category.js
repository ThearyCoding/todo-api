const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true,
        match: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
