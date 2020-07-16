const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

//Create express server
const app = express();

//Serve static assests in production
if ((process.env.NODE_ENV = "production")) {
  //Set static folder
  app.use(express.static("mern-exercise-tracker/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "mern-exercise-tracker", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB Connection

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose Database connection established successfully!");
});

const exercisesRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port :  ${port}`);
});
