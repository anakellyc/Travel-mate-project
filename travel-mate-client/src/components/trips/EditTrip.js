import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class EditTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: this.props.theTrip.destination,
      startDate: this.props.theTrip.startDate,
      endDate: this.props.theTrip.endDate,
      pointsOfInterest: this.props.theTrip.pointsOfInterest
    };
  }

  handleFormSubmit = event => {
    const destination = this.state.destination;
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const pointsOfInterest = this.state.pointsOfInterest;

    event.preventDefault();

    axios
      .put(
        `http://localhost:5000/api/trips/${this.props.theTrip._id}`,
        {
          destination,
          startDate,
          endDate,
          pointsOfInterest
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getTheTrip();
      })
      .catch(error => console.log(error));
  };

  handleChangeDestination = event => {
    this.setState({
      destination: event.target.value
    });
  };

  // handleChangeStartDate = event => {
  //   this.setState({
  //     startDate: event.target.value
  //   });
  // };
  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  // handleChangeEndDate = event => {
  //   this.setState({
  //     endDate: event.target.value
  //   });
  // };
  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  handleChangePoints = event => {
    this.setState({
      pointsOfInterest: event.target.value
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit Trip</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={this.state.destination}
            onChange={e => this.handleChangeDestination(e)}
          />
          {/* <label>Start Date:</label>
          <input
            type="text"
            name="startDate"
            value={this.state.startDate}
            onChange={e => this.handleChangeStartDate(e)}
          /> */}
          <label>Start Date:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="btn-block"
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          {/* <label>End Date:</label>
          <input
            type="text"
            name="endDate"
            value={this.state.endDate}
            onChange={e => this.handleChangeEndDate(e)}
          /> */}
          <label>End Date:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            minDate={new Date(this.state.startDate)}
            className="btn-block"
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
          <label>Points of Interest:</label>
          <textarea
            name="pointsOfInterest"
            value={this.state.pointsOfInterest}
            onChange={e => this.handleChangePoints(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditTrip;
