import React from "react";
import { Button } from "@material-ui/core";
import EventSeatIcon from "@material-ui/icons/EventSeat";

const Seat = (props) => {
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
      <Button
        className="square"
        variant="contained"
        size="small"
        disabled={btnDisabled}
        style={{ backgroundColor: color, margin: "10px" }}
        onClick={props.onClickSeat}
      >
        <EventSeatIcon color="inherit" fontSize="medium"></EventSeatIcon>
      </Button>
    </>
  );
};

export default Seat;
