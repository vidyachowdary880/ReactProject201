import React, { Component } from "react";
import FlightPage from "../FlightPage";

export default class InFlightPage extends Component {
  render() {
    return (
      <div>
        <FlightPage updateServices={true} />
      </div>
    );
  }
}
