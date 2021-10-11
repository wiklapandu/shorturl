const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        require: true,
    },
    short_url: {
        type: Number,
        require: true,
        default: 0,
    },
});

const Url = mongoose.model('url', urlSchema);

module.exports = Url;