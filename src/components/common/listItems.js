import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightIcon from "@material-ui/icons/Flight";

export const mainListItems = (
  <div>
    <ListSubheader inset>ChekIn</ListSubheader>
    <ListItem button onClick={click()}>
      <ListItemIcon>
        <FlightIcon />
      </ListItemIcon>
      <ListItemText primary="Flights" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>In flight</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <FlightTakeoffIcon />
      </ListItemIcon>
      <ListItemText primary="Select Flight" />
    </ListItem>
  </div>
);
