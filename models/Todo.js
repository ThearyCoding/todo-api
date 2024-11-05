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