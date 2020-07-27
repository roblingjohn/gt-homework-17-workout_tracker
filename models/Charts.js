const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Chart = new Schema({
    type: {
        type: String
    },
    
});

// const Book = mongoose.model("Book", BookSchema);

module.exports = Chart;