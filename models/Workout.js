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
  totalDuration: {
    type: Number,
    default: 0,
  },
},
{toJSON: {virtuals: true}}
);

WorkoutSchema.methods.totalWeight = function () {
  for (i = 0; i < this.exercises.length; i++) {
    if (this.exercises.weight) {
      let totalWeight;
      totalWeight = totalWeight + this.exercises.weight;
    }
  }
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;