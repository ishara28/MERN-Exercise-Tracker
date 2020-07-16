import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> | 
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: []
    };
  }

  //Get all exercises
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then(res => {
        this.setState({
          exercises: res.data
        });
      })
      .then(console.log(this.state.exercises))
      .catch(err => console.log(err));
  }

  //Delete exercise with relevent id
  deleteExercise = id => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    });
  };

  exerciseList = () => {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
