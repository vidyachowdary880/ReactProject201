import React, { useState, useEffect } from "react";
import * as flightApi from "../api/flightApi";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  linkText: {
    color: "white",
    textDecoration: "none",
  },
}));
const FlightPage = (props) => {
  const classes = useStyles();
  const services = props.updateServices;
  const [flightList, setFlightList] = useState([]);

  useEffect(() => {
    if (flightList.length === 0) {
      flightApi.getFlights().then((resp) => {
        let currentTime = new Date();
        var offset = -currentTime.getTimezoneOffset();
        currentTime.setMinutes(currentTime.getMinutes() + offset);
        currentTime.setHours(currentTime.getHours() + 2);
        let filterList = resp.filter(
          (flight) => new Date(flight.depatureTime) > currentTime
        );
        console.log(filterList);
        setFlightList(...flightList, filterList);
      });
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>FligtName</TableCell>
            <TableCell>Depature</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>startTime</TableCell>
            <TableCell>EndTime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flightList.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.depature}</TableCell>
                <TableCell>{row.destination}</TableCell>
                <TableCell>
                  {new Date(row.depatureTime).getMonth() +
                    "/" +
                    new Date(row.depatureTime).getDate() +
                    " " +
                    new Date(row.depatureTime).getHours() +
                    ":" +
                    new Date(row.depatureTime).getMinutes()}
                </TableCell>
                <TableCell>
                  {new Date(row.arrivalTime).getMonth() +
                    "/" +
                    new Date(row.arrivalTime).getDate() +
                    " " +
                    new Date(row.arrivalTime).getHours() +
                    ":" +
                    new Date(row.arrivalTime).getMinutes()}
                </TableCell>
                <TableCell>
                  {services ? (
                    // inFlight
                    <Button variant="contained" color="primary">
                      <Link
                        className={classes.linkText}
                        to={`/staff/inFlight/managePassengers/${row.id}/${services}`}
                      >
                        Manage
                      </Link>
                    </Button>
                  ) : (
                    // checkIn
                    <Button variant="contained" color="primary">
                      <Link
                        className={classes.linkText}
                        to={"/staff/checkIn/" + row.id}
                      >
                        Manage
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlightPage;
