const { Schema } = require('mongoose');

const todoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        default: ""
    },
    tags: {
        type: Array,
        default: []
    },
    time: {
        type: Date,
        required: false,
        default: new Date()
    },
    completed: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Number,
        default: 0
    }
})

module.exports = todoSchema;