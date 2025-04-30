const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('todo', TodoSchema);