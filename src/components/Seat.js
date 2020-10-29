import React from "react";
import { Button } from "@material-ui/core";
import EventSeatIcon from "@material-ui/icons/EventSeat";

const Seat = (props) => {
  let mealSeat=props.meal;
  console.log("mealseat",mealSeat);
  let key = props.seatData;
  let color;
  let btnDisabled = false;
  switch (key) {
    case "BLOCKED":
      color = "grey";
      btnDisabled = true;
      break;
    case "BLOCKED WITH WHEELCHAIR":
      color = "red";
      break;

    case "BLOCKED WITH INFANT":
      color = "yellow";
      break;

    case "BLOCKED WITH BOTH":
      color = "orange";
      break;
    case "SELECTED":
      color = "blue";
      break;
    case "MEAL":
      color = "GREEN";
      break;
    case "NO MEAL":
      color = "RED";
      break;

    default:
      color = "white";
  }

  return (
    <>
    {mealSeat ? ( <>
      <Button
        className="square"
        variant="contained"
        size="small"
        disabled={btnDisabled}
        style={{ backgroundColor: color, margin: "10px" }}
      >
        <EventSeatIcon color="inherit" fontSize="small"></EventSeatIcon>
      </Button>
    </>
    ):(<>
    <Button
        className="square"
        variant="contained"
        size="small"
        value={props.seatNo}
        disabled={btnDisabled}
        style={{ backgroundColor: color, margin: "10px" }}
        onClick={props.onClickSeat}
      >
        {props.seatNo}
        <EventSeatIcon color="inherit" fontSize="small"></EventSeatIcon>
      </Button>
    </>)}
  </>);
};

export default Seat;
