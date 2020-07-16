const router = require("express").Router();
let Exercises = require("../models/exercise.model");

//Get all the exercises
router.route("/").get((req, res) => {
  Exercises.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error : " + err));
});

//Add an exercise
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercises({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("New Exercise Added!"))
    .catch(err => res.status(400).json("Error : " + err));
});

//Get an exercise to relevant id
router.route("/:id").get((req, res) => {
  Exercises.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

//delete an exercise to relevent id
router.route("/:id").delete((req, res) => {
  Exercises.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Update an exercise to relevent id
router.route("/update/:id").post((req, res) => {
  Exercises.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
