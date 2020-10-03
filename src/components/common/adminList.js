import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import FlightIcon from "@material-ui/icons/Flight";
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <FlightIcon />
      </ListItemIcon>
      <ListItemText primary="Flights" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Passenngers" />
    </ListItem>
  </div>
);
