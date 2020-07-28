const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  exercises: [
    {
      type: String,
      name: {
        type: String,
        required: "Please enter a workout name.",
      },
      duration: {
        type: Number,
        required: "Please enter duration.",
      },
      distance: {
        type: Number,
        required: "Please enter distance.",
      },
      weight: {
        type: Number,
        required: "Please enter weight.",
      },
      reps: {
        type: Number,
        required: "Please enter duration.",
      },
      sets: {
        type: Number,
        required: "Please enter number of sets.",
      },
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
