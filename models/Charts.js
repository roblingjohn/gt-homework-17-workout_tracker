const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChartSchema = new Schema({
    type: {
        type: String
    },

});

const Chart = mongoose.model("Chart", ChartSchema);

module.exports = Chart;