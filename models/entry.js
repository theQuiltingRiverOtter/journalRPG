const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    planetName: {
        type: String,
        required: true,
        minlength: 2
    },
    captainName: {
        type: String,
        default: "Megan",
        minlength: 2
    },
    text: {
        type: String,
        required: true,
        minlength: 10
    },
    date: {
        type: String,
        required: true
    }
})

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;


