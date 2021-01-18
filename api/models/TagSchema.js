const { Schema } = require('mongoose');

const tagSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#000"
    }
})

module.exports = tagSchema;