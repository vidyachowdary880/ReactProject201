import React, { useEffect, useState } from "react";
import * as passengerApi from "../api/passengerApi";
import Seat from "./Seat";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 550,
  },
  box: {
    marginLeft: 750,
    marginBottom: 2,
  },
});
const MealsSeatMap = (props) => {
  const classes = useStyles();

  const [seatArray, setSeatArray] = useState(Array(20).fill(0));

  useEffect(() => {
    passengerApi.getPassengerFlightDetails(props.flightId).then((resp) => {
      console.log(resp);
      const currentList = resp;

      // getting all passengers having seat
      let passengersWithSeat = currentList
        .filter((passenger) => passenger.seatNo !== "")
        .map((passenger) => {
          return {
            paxId: passenger.id,
            seatNo: passenger.seatNo,
            meals: passenger.specialMeals,
          };
        });
      setSeatsMap(passengersWithSeat);
    });
  }, [props.flightId]);

  function setSeatsMap(passengersWithSeat) {
    passengersWithSeat.map((item) => {
      formSeatArray(item);
    });
    setSeatArray(seatArray);
    console.log("seatArray", seatArray);
  }

  function formSeatArray(item) {
    const { seatNo, meals } = item;

    let row;
    let col;
    if (seatNo.length == 3) {
      row = String(seatNo).charAt(0) + String(seatNo).charAt(1) - 1;
      col = String(seatNo).charAt(2);
    } else {
      row = String(seatNo).charAt(0) - 1;
      col = String(seatNo).charAt(1);
    }
    let currentObj = {};
    if (seatArray[row] !== undefined && seatArray[row] !== 0) {
      currentObj = seatArray[row];
    }
    if (meals !== "") {
      currentObj[col] = "MEAL";
      seatArray[row] = currentObj;
    } else {
      currentObj[col] = "NO MEAL";
      seatArray[row] = currentObj;
    }
  }
  return (
    <>
      <Box component="div" display="inline">
        <TableContainer className={classes.table}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>A</TableCell>
                <TableCell>B</TableCell>
                <TableCell>C</TableCell>
                <TableCell>D</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seatArray.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Seat seatData={row.A} />
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.B} />
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.C} />
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.D} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box component="div" display="inline" className={classes.box}>
        <Seat seatData="MEAL" />
        <b>MEAL</b>
        <Seat seatData="NO MEAL" />
        <b>NO SPEACIAL MEAL</b>
      </Box>
    </>
  );
};

export default MealsSeatMap;
