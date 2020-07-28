const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/api/workouts/", (req, res) => {
  db.Workout.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.post("/api/workouts", ({ body }, res) => {
  const newWorkout = new db.Workout(body);

  db.Workout.create(newWorkout)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { exercises: req.body },
      $inc: { totalDuration: req.body.duration },
    },
    { new: true }
  )
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });

  // db.Workout.update({_id: req.params.id}, req.body)
  // .then(dbWorkout => {
  //   res.json(dbWorkout);
  // })
  // .catch(err => {
  //   res.json(err);
  // });
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// db.WorkoutTracker.create({ name: "Workout Tracker" })
//   .then(dbWorkoutTracker => {
//     console.log(dbWorkoutTracker);
//   })
//   .catch(({message}) => {
//     console.log(message);
//   });

// app.post("/submit", ({body}, res) => {
//   db.Book.create(body)
//     .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/books", (req, res) => {
//   db.Book.find({})
//     .then(dbBook => {
//       res.json(dbBook);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/library", (req, res) => {
//   db.Library.find({})
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populated", (req, res) => {
//   db.Library.find({})
//     .populate("books")
//     .then(dbLibrary => {
//       res.json(dbLibrary);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
